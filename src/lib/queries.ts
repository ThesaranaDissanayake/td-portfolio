import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isRemoteApiConfigured, postApi, projectApi } from "./apiClient";
import { Post } from "@/types";
import { PostStatus } from "@/types";

// Query keys for consistent caching
export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    lists: () => [...queryKeys.posts.all, "list"] as const,
    list: (filters: {
      page?: number;
      limit?: number;
      search?: string;
      contentCategoryId?: number;
      status?: PostStatus;
    }) => [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
    bySlug: (slug: string) =>
      [...queryKeys.posts.details(), "slug", slug] as const,
    featured: (contentCategoryId?: number) =>
      [...queryKeys.posts.all, "featured", contentCategoryId] as const,
  },
  projects: {
    all: ["projects"] as const,
    lists: () => [...queryKeys.projects.all, "list"] as const,
    list: (filters: {
      page?: number;
      limit?: number;
      search?: string;
      technology?: string;
    }) => [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.projects.details(), id] as const,
    bySlug: (slug: string) =>
      [...queryKeys.projects.details(), "slug", slug] as const,
    featured: () => [...queryKeys.projects.all, "featured"] as const,
  },
};

// Post hooks (new, generic for all content types)
export const usePosts = (
  page = 1,
  limit = 10,
  contentCategoryId?: number,
  status?: PostStatus,
) => {
  return useQuery({
    queryKey: queryKeys.posts.list({ page, limit, contentCategoryId, status }),
    queryFn: () => postApi.getAll(page, limit, contentCategoryId, status),
    enabled: isRemoteApiConfigured,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePostsByContentCategory = (
  categoryName: string,
  page = 1,
  limit = 10,
  status?: PostStatus,
) => {
  return useQuery({
    queryKey: queryKeys.posts.list({
      page,
      limit,
      search: categoryName,
      status,
    }),
    queryFn: () =>
      postApi.getByContentCategory(categoryName, page, limit, status),
    enabled: isRemoteApiConfigured && !!categoryName.trim(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: isRemoteApiConfigured && !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.posts.bySlug(slug),
    queryFn: () => postApi.getBySlug(slug),
    enabled: isRemoteApiConfigured && !!slug.trim(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useSearchPosts = (
  query: string,
  page = 1,
  limit = 10,
  contentCategoryId?: number,
) => {
  return useQuery({
    queryKey: queryKeys.posts.list({
      page,
      limit,
      search: query,
      contentCategoryId,
    }),
    queryFn: () => postApi.search(query, page, limit, contentCategoryId),
    enabled: isRemoteApiConfigured && !!query.trim(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Project hooks
export const useProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ page, limit }),
    queryFn: () => projectApi.getAll(page, limit),
    enabled: isRemoteApiConfigured,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectApi.getById(id),
    enabled: isRemoteApiConfigured && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.projects.bySlug(slug),
    queryFn: () => projectApi.getBySlug(slug),
    enabled: isRemoteApiConfigured && !!slug.trim(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useSearchProjects = (query: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ page, limit, search: query }),
    queryFn: () => projectApi.search(query, page, limit),
    enabled: isRemoteApiConfigured && !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProjectsByTechnology = (
  technology: string,
  page = 1,
  limit = 10,
) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ page, limit, technology }),
    queryFn: () => projectApi.getByTechnology(technology, page, limit),
    enabled: isRemoteApiConfigured && !!technology.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects.featured(),
    queryFn: () => projectApi.getFeatured(),
    enabled: isRemoteApiConfigured,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useAddLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => {
      return postApi.addLike(id, likes);
    },
    onSuccess: (_, variables) => {
      // Invalidate detail queries to refresh like count
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.detail(variables.id),
      });
    },
  });
};
