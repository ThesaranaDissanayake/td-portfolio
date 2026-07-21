import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  BackendPostDto,
  Project,
  PaginatedResponse,
  BackendApiResponse,
  PostContentCategory,
  PostStatus,
} from "@/types";
import { mockProjects, createPaginatedResponse, searchData } from "./mockData";

// API Configuration for .NET Backend
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, "") || undefined;
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000");
const REMOTE_API_DISABLED_MESSAGE =
  "NEXT_PUBLIC_API_URL is not configured; remote API requests are disabled.";

export const isRemoteApiConfigured = Boolean(API_BASE_URL);

const getApiBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new Error(REMOTE_API_DISABLED_MESSAGE);
  }

  return API_BASE_URL;
};

const getPostEndpoint = () => `${getApiBaseUrl()}/posts`;
const getPostContentCategoryEndpoint = () =>
  `${getPostEndpoint()}/content-category`;

const PROJECT_CONTENT_CATEGORY_NAME = "Project";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 10;
const MAX_PAGE_LIMIT = 100;
const VALID_POST_STATUSES = new Set<number>(
  Object.values(PostStatus).filter(
    (status): status is number => typeof status === "number",
  ),
);

const validatePositiveInteger = (value: number, fieldName: string) => {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${fieldName} must be a positive integer.`);
  }

  return value;
};

const validateOptionalPositiveInteger = (
  value: number | undefined,
  fieldName: string,
) => {
  if (value === undefined) return undefined;

  return validatePositiveInteger(value, fieldName);
};

const normalizePagination = (
  page = DEFAULT_PAGE,
  limit = DEFAULT_PAGE_LIMIT,
) => {
  const normalizedPage = validatePositiveInteger(page, "page");
  const normalizedLimit = Math.min(
    validatePositiveInteger(limit, "limit"),
    MAX_PAGE_LIMIT,
  );

  return { page: normalizedPage, limit: normalizedLimit };
};

const encodePathSegment = (value: string, fieldName: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new Error(`${fieldName} is required.`);
  }

  return encodeURIComponent(trimmedValue);
};

const validateSearchQuery = (query: string) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("query is required.");
  }

  return trimmedQuery;
};

const validateOptionalPostStatus = (status?: PostStatus) => {
  if (status === undefined) return undefined;

  if (!VALID_POST_STATUSES.has(status)) {
    throw new Error("status must be a valid post status.");
  }

  return status;
};

const buildUrl = (
  endpoint: string,
  queryParams: Record<string, string | number | undefined>,
) => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

const createEmptyPaginatedResponse = <T>(
  page: number,
  limit: number,
): PaginatedResponse<T> => ({
  data: [],
  pagination: {
    page,
    limit,
    total: 0,
    totalPages: 1,
  },
});

const requireNonEmptyString = (value: string, fieldName: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new Error(`${fieldName} is required.`);
  }

  return trimmedValue;
};

const optionalTrimmedString = (value?: string) => {
  const trimmedValue = value?.trim();

  return trimmedValue || undefined;
};

const normalizeTechnologies = (
  technologies: BackendPostDto["technologies"],
  tags: BackendPostDto["tags"],
) => {
  const technologyValues =
    typeof technologies === "string" ? technologies.split(",") : technologies;

  if (technologyValues?.length) {
    return technologyValues
      .map((technology) => technology.trim())
      .filter(Boolean);
  }

  return (
    tags
      ?.map((tag) => (typeof tag === "string" ? tag : tag.name))
      .map((tagName) => tagName.trim())
      .filter(Boolean) || []
  );
};

const getContributorNames = (post: BackendPostDto) => {
  if (post.contributors?.length) {
    const contributorNames = post.contributors
      .map((contributor) =>
        `${contributor.firstName} ${contributor.lastName}`.trim(),
      )
      .filter(Boolean);

    if (contributorNames.length) {
      return contributorNames;
    }
  }

  if (post.owner) {
    const ownerName = `${post.owner.firstName} ${post.owner.lastName}`.trim();
    return ownerName ? [ownerName] : undefined;
  }

  return undefined;
};

const mapBackendPostToProject = (post: BackendPostDto): Project => {
  const id = validatePositiveInteger(post.id, "project.id");
  const title = requireNonEmptyString(post.title, "project.title");
  const slug = requireNonEmptyString(post.slug, "project.slug");
  const coverImage = optionalTrimmedString(post.coverImage);
  const image = optionalTrimmedString(post.image) || coverImage;
  const liveUrl = optionalTrimmedString(post.liveUrl);

  return {
    id,
    title,
    description:
      optionalTrimmedString(post.description) ||
      optionalTrimmedString(post.excerpt) ||
      optionalTrimmedString(post.content),
    image,
    link: liveUrl,
    contributors: getContributorNames(post),
    likes:
      Number.isFinite(post.likes) && post.likes > 0
        ? Math.floor(post.likes)
        : 0,
    date:
      optionalTrimmedString(post.date) || optionalTrimmedString(post.createdAt),
    technologies: normalizeTechnologies(post.technologies, post.tags),
    githubUrl: optionalTrimmedString(post.githubUrl),
    liveUrl,
    excerpt: optionalTrimmedString(post.excerpt),
    coverImage,
    content: post.content,
    owner: post.owner,
    tags: post.tags,
    createdAt: post.createdAt,
    slug,
    status: post.status,
  };
};

const mapPaginatedBackendPostsToProjects = (
  response: PaginatedResponse<BackendPostDto>,
): PaginatedResponse<Project> => ({
  ...response,
  data: response.data.map(mapBackendPostToProject),
});

const mapBackendPostResponseToProject = (
  response: BackendApiResponse<BackendPostDto>,
): BackendApiResponse<Project> => ({
  ...response,
  data: mapBackendPostToProject(response.data),
});

const createSlugFromTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const mapProjectToBackendPostCreateDto = (
  project: Omit<Project, "id">,
): Omit<BackendPostDto, "id"> => {
  const title = requireNonEmptyString(project.title, "project.title");
  const slug =
    optionalTrimmedString(project.slug) || createSlugFromTitle(title);
  const content =
    optionalTrimmedString(project.content) ||
    optionalTrimmedString(project.description) ||
    "";

  return {
    title,
    content,
    slug,
    likes: project.likes ?? 0,
    coverImage: project.coverImage || project.image,
    description: project.description,
    status: project.status,
    tags: project.tags,
    createdAt: project.createdAt,
    excerpt: project.excerpt,
    technologies: project.technologies,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl || project.link,
    date: project.date,
    image: project.image,
  };
};

const mapProjectToBackendPostUpdateDto = (
  project: Partial<Project>,
): Partial<BackendPostDto> => {
  const payload: Partial<BackendPostDto> = {};

  if (project.title !== undefined) {
    payload.title = requireNonEmptyString(project.title, "project.title");
  }
  if (project.content !== undefined) payload.content = project.content;
  if (project.slug !== undefined) {
    payload.slug = requireNonEmptyString(project.slug, "project.slug");
  }
  if (project.likes !== undefined) payload.likes = project.likes;
  if (project.coverImage !== undefined) payload.coverImage = project.coverImage;
  if (project.image !== undefined) payload.image = project.image;
  if (project.description !== undefined) {
    payload.description = project.description;
  }
  if (project.status !== undefined) payload.status = project.status;
  if (project.tags !== undefined) payload.tags = project.tags;
  if (project.createdAt !== undefined) payload.createdAt = project.createdAt;
  if (project.excerpt !== undefined) payload.excerpt = project.excerpt;
  if (project.technologies !== undefined) {
    payload.technologies = project.technologies;
  }
  if (project.githubUrl !== undefined) payload.githubUrl = project.githubUrl;
  if (project.liveUrl !== undefined || project.link !== undefined) {
    payload.liveUrl = project.liveUrl || project.link;
  }
  if (project.date !== undefined) payload.date = project.date;

  return payload;
};

// Create axios instance with default configuration for .NET Backend
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // .NET specific headers
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  client.interceptors.request.use((config) => {
    if (!API_BASE_URL) {
      throw new Error(REMOTE_API_DISABLED_MESSAGE);
    }

    return config;
  });

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle .NET backend specific errors
      if (error.response?.status === 401) {
        console.error("Unauthorized API request:", error.config?.url);
      }

      if (error.response?.status === 403) {
        // Handle forbidden
        console.error("Access forbidden:", error.config?.url);
      }

      if (error.response?.status === 404) {
        console.error("Resource not found:", error.config?.url);
      }

      if (error.response?.status === 500) {
        console.error("Server error:", error.response?.data);
      }

      // Handle .NET validation errors (400)
      if (error.response?.status === 400) {
        console.error("Validation error:", error.response?.data);
      }

      return Promise.reject(error);
    },
  );

  return client;
};

// API client instance
const apiClient = createApiClient();

class MissingContentCategoryError extends Error {
  constructor(categoryName: string) {
    super(`Content category '${categoryName}' was not found.`);
    this.name = "MissingContentCategoryError";
  }
}

const isMissingContentCategoryError = (
  error: unknown,
): error is MissingContentCategoryError =>
  error instanceof MissingContentCategoryError;

const isExpectedMissingContentCategoryHttpError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 404;

const getContentCategoryByName = async (
  categoryName: string,
): Promise<PostContentCategory> => {
  const encodedName = encodePathSegment(categoryName, "categoryName");

  try {
    const response = await apiClient.get<
      BackendApiResponse<PostContentCategory>
    >(`${getPostContentCategoryEndpoint()}/${encodedName}`);
    const contentCategory = response.data.data;

    if (!response.data.isSuccess || !contentCategory) {
      if (response.data.error?.code === 404) {
        throw new MissingContentCategoryError(categoryName);
      }

      throw new Error(`Could not resolve content category '${categoryName}'.`);
    }

    validatePositiveInteger(contentCategory.id, "contentCategory.id");
    return contentCategory;
  } catch (error) {
    if (isExpectedMissingContentCategoryHttpError(error)) {
      throw new MissingContentCategoryError(categoryName);
    }

    throw error;
  }
};

let projectContentCategoryIdPromise: Promise<number> | undefined;

const getProjectContentCategoryId = () => {
  if (!projectContentCategoryIdPromise) {
    projectContentCategoryIdPromise = getContentCategoryByName(
      PROJECT_CONTENT_CATEGORY_NAME,
    )
      .then((category) =>
        validatePositiveInteger(category.id, "project contentCategoryId"),
      )
      .catch((error) => {
        projectContentCategoryIdPromise = undefined;

        if (isMissingContentCategoryError(error)) {
          throw new Error(
            "Project content category is not configured in the backend.",
          );
        }

        throw error;
      });
  }

  return projectContentCategoryIdPromise;
};

const getPostContentCategoryId = (post: BackendPostDto) =>
  post.contentCategoryId ?? post.contentCategory?.id;

const assertBackendPostIsProject = async (
  post: BackendPostDto,
): Promise<BackendPostDto> => {
  const projectContentCategoryId = await getProjectContentCategoryId();
  const postContentCategoryName = post.contentCategory?.name
    ?.trim()
    .toLowerCase();

  if (
    getPostContentCategoryId(post) === projectContentCategoryId ||
    postContentCategoryName === PROJECT_CONTENT_CATEGORY_NAME.toLowerCase()
  ) {
    return post;
  }

  throw new Error("Project not found.");
};

// Generic API methods
export const api = {
  // Generic GET request
  get: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    getApiBaseUrl();
    return apiClient.get<T>(url, config);
  },

  // Generic POST request
  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    getApiBaseUrl();
    return apiClient.post<T>(url, data, config);
  },

  // Generic PUT request
  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    getApiBaseUrl();
    return apiClient.put<T>(url, data, config);
  },

  // Generic DELETE request
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    getApiBaseUrl();
    return apiClient.delete<T>(url, config);
  },
};

// Mock API methods (for development/testing)
const mockApi = {
  // Simulate network delay
  delay: (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  // Project API methods
  projects: {
    getAll: async (
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      return createPaginatedResponse(
        mockProjects,
        page,
        limit,
        mockProjects.length,
      );
    },

    getById: async (id: number): Promise<Project> => {
      await mockApi.delay();
      const project = mockProjects.find((p) => p.id === id);
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    },

    search: async (
      query: string,
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      const filteredProjects = searchData(mockProjects, query);
      return createPaginatedResponse(
        filteredProjects,
        page,
        limit,
        filteredProjects.length,
      );
    },

    getFeatured: async (): Promise<Project[]> => {
      await mockApi.delay();
      return mockProjects.filter((project) => project.featured).slice(0, 3);
    },

    getByTechnology: async (
      technology: string,
      page = 1,
      limit = 10,
    ): Promise<PaginatedResponse<Project>> => {
      await mockApi.delay();
      const filteredProjects = mockProjects.filter((project) => {
        const techs = project.technologies || [];

        return techs.some((tech) =>
          tech.toLowerCase().includes(technology.toLowerCase()),
        );
      });
      return createPaginatedResponse(
        filteredProjects,
        page,
        limit,
        filteredProjects.length,
      );
    },
  },
};

// Post API methods - .NET Backend
export const postApi = {
  // Get all posts with optional pagination and filtering
  getAll: async (
    page = 1,
    limit = 10,
    contentCategoryId?: number,
    status?: PostStatus,
  ): Promise<PaginatedResponse<BackendPostDto>> => {
    const pagination = normalizePagination(page, limit);
    const normalizedContentCategoryId = validateOptionalPositiveInteger(
      contentCategoryId,
      "contentCategoryId",
    );
    const normalizedStatus = validateOptionalPostStatus(status);
    const url = buildUrl(getPostEndpoint(), {
      limit: pagination.limit,
      page: pagination.page,
      contentCategoryId: normalizedContentCategoryId,
      status: normalizedStatus,
    });

    // Backend returns Result<IEnumerable<PostDto>> structure
    const response =
      await apiClient.get<BackendApiResponse<BackendPostDto[]>>(url);

    // Transform to PaginatedResponse format
    const posts = response.data.data || [];
    return {
      data: posts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: posts.length, // Backend doesn't return total, use array length
        totalPages: Math.ceil(posts.length / pagination.limit) || 1,
      },
    };
  },

  // Get posts by content category (Project, Article, etc.)
  getByContentCategory: async (
    categoryName: string,
    page = 1,
    limit = 10,
    status?: PostStatus,
  ): Promise<PaginatedResponse<BackendPostDto>> => {
    const pagination = normalizePagination(page, limit);

    try {
      const category = await getContentCategoryByName(categoryName);
      return postApi.getAll(
        pagination.page,
        pagination.limit,
        category.id,
        status,
      );
    } catch (error) {
      if (isMissingContentCategoryError(error)) {
        console.warn(
          `Content category '${categoryName}' was not found; returning an empty result.`,
        );
        return createEmptyPaginatedResponse<BackendPostDto>(
          pagination.page,
          pagination.limit,
        );
      }

      throw error;
    }
  },

  // Get post by ID
  getById: async (id: number): Promise<BackendApiResponse<BackendPostDto>> => {
    const postId = validatePositiveInteger(id, "id");
    const response = await apiClient.get<BackendApiResponse<BackendPostDto>>(
      `${getPostEndpoint()}/${postId}`,
    );
    return response.data;
  },

  // Get post by slug
  getBySlug: async (
    slug: string,
  ): Promise<BackendApiResponse<BackendPostDto>> => {
    const encodedSlug = encodePathSegment(slug, "slug");
    const response = await apiClient.get<BackendApiResponse<BackendPostDto>>(
      `${getPostEndpoint()}/${encodedSlug}`,
    );
    return response.data;
  },

  // Search posts
  search: async (
    query: string,
    page = 1,
    limit = 10,
    contentCategoryId?: number,
  ): Promise<PaginatedResponse<BackendPostDto>> => {
    const pagination = normalizePagination(page, limit);
    const normalizedContentCategoryId = validateOptionalPositiveInteger(
      contentCategoryId,
      "contentCategoryId",
    );
    const url = buildUrl(`${getPostEndpoint()}/search`, {
      q: validateSearchQuery(query),
      page: pagination.page,
      pageSize: pagination.limit,
      contentCategoryId: normalizedContentCategoryId,
    });

    // Backend returns Result<IEnumerable<PostDto>> structure
    const response =
      await apiClient.get<BackendApiResponse<BackendPostDto[]>>(url);
    const posts = response.data.data || [];

    return {
      data: posts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: posts.length,
        totalPages: Math.ceil(posts.length / pagination.limit) || 1,
      },
    };
  },

  // Get featured posts
  getFeatured: async (
    contentCategoryId?: number,
  ): Promise<BackendPostDto[]> => {
    const normalizedContentCategoryId = validateOptionalPositiveInteger(
      contentCategoryId,
      "contentCategoryId",
    );
    const url = buildUrl(`${getPostEndpoint()}/featured`, {
      contentCategoryId: normalizedContentCategoryId,
    });
    const response = await apiClient.get<BackendPostDto[]>(url);
    return response.data;
  },

  // Create new post (if authenticated)
  create: async (post: Omit<BackendPostDto, "id">): Promise<BackendPostDto> => {
    const response = await apiClient.post<BackendPostDto>(
      getPostEndpoint(),
      post,
    );
    return response.data;
  },

  // Update post (if authenticated)
  update: async (
    id: number,
    post: Partial<BackendPostDto>,
  ): Promise<BackendPostDto> => {
    const postId = validatePositiveInteger(id, "id");
    const response = await apiClient.put<BackendPostDto>(
      `${getPostEndpoint()}/${postId}`,
      post,
    );
    return response.data;
  },

  // Delete post (if authenticated)
  delete: async (id: number): Promise<void> => {
    const postId = validatePositiveInteger(id, "id");
    await apiClient.delete(`${getPostEndpoint()}/${postId}`);
  },

  // Add like to post
  addLike: async (guId: number, likes: number = 1): Promise<void> => {
    // Backend expects { guId: number, likes: number }
    // Note: Backend calls it 'GuId' but it's a long (id), not a Guid.
    await apiClient.patch(`${getPostEndpoint()}/like`, {
      guId: validatePositiveInteger(guId, "guId"),
      likes: validatePositiveInteger(likes, "likes"),
    });
  },
};

// Post Content Category API methods
export const postContentCategoryApi = {
  // Get all content categories
  getAll: async (): Promise<PostContentCategory[]> => {
    const response = await apiClient.get<
      BackendApiResponse<PostContentCategory[]>
    >(getPostContentCategoryEndpoint());
    return response.data.data;
  },

  // Get content category by name
  getByName: async (name: string): Promise<PostContentCategory> => {
    return getContentCategoryByName(name);
  },
};

// Project API methods - Uses Post API with Project content category
export const projectApi = {
  // Get all projects with optional pagination
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Project>> => {
    const projectContentCategoryId = await getProjectContentCategoryId();
    const response = await postApi.getAll(
      page,
      limit,
      projectContentCategoryId,
      PostStatus.Published,
    );

    return mapPaginatedBackendPostsToProjects(response);
  },

  // Get project by ID
  getById: async (id: number): Promise<Project> => {
    const response = await postApi.getById(id);
    const projectPost = await assertBackendPostIsProject(response.data);
    return mapBackendPostToProject(projectPost);
  },

  // Get project by slug
  getBySlug: async (slug: string): Promise<BackendApiResponse<Project>> => {
    const response = await postApi.getBySlug(slug);
    const projectPost = await assertBackendPostIsProject(response.data);
    return mapBackendPostResponseToProject({
      ...response,
      data: projectPost,
    });
  },

  // Search projects
  search: async (
    query: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Project>> => {
    const projectContentCategoryId = await getProjectContentCategoryId();
    const response = await postApi.search(
      query,
      page,
      limit,
      projectContentCategoryId,
    );
    return mapPaginatedBackendPostsToProjects(response);
  },

  // Get featured projects
  getFeatured: async (): Promise<Project[]> => {
    const projectContentCategoryId = await getProjectContentCategoryId();
    const posts = await postApi.getFeatured(projectContentCategoryId);
    return posts.map(mapBackendPostToProject);
  },

  // Get projects by technology (will search tags/categories)
  getByTechnology: async (
    technology: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Project>> => {
    // Use search to find projects with specific technology
    const projectContentCategoryId = await getProjectContentCategoryId();
    const response = await postApi.search(
      technology,
      page,
      limit,
      projectContentCategoryId,
    );
    return mapPaginatedBackendPostsToProjects(response);
  },

  // Create new project (if authenticated)
  create: async (project: Omit<Project, "id">): Promise<Project> => {
    const post = await postApi.create(
      mapProjectToBackendPostCreateDto(project),
    );
    return mapBackendPostToProject(post);
  },

  // Update project (if authenticated)
  update: async (id: number, project: Partial<Project>): Promise<Project> => {
    const post = await postApi.update(
      id,
      mapProjectToBackendPostUpdateDto(project),
    );
    return mapBackendPostToProject(post);
  },

  // Delete project (if authenticated)
  delete: async (id: number): Promise<void> => {
    return postApi.delete(id);
  },
};

// Utility functions for .NET Backend
export const apiUtils = {
  // Handle .NET validation errors
  handleValidationError: (error: unknown) => {
    const apiError = error as {
      response?: {
        status?: number;
        data?: { errors?: Record<string, string[]> };
      };
    };

    if (apiError.response?.status === 400) {
      const validationErrors = apiError.response.data?.errors;
      if (validationErrors) {
        return Object.keys(validationErrors).map((key) => ({
          field: key,
          message: validationErrors[key][0],
        }));
      }
    }
    return [];
  },

  // Format .NET API response
  formatResponse: (response: unknown) => {
    // Handle .NET API response structure
    if (
      response &&
      typeof response === "object" &&
      "data" in response &&
      response.data &&
      typeof response.data === "object"
    ) {
      return response.data;
    }
    return response;
  },
};

export default apiClient;
