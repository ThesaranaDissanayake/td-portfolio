export type ImageItem = {
  id: number;
  src: string;
  alt: string;
};

export type DownloadableDocument = {
  href: string;
  label: string;
  fileName?: string;
};

export type ProjectDemoVideo = {
  provider: "youtube";
  title: string;
  videoId: string;
  sectionTitle?: string;
  eyebrow?: string;
  aspectRatio?: string;
  thumbnailSrc?: string;
};

export interface ApplicationUser {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Media {
  id: number;
  type?: "image" | "video";
  fileName: string;
  altText: string;
  caption: string;
  contentType: string;
  fileSize: number;
  path: string; // Main file URL
  thumbnailPath?: string; // Thumbnail URL for images
  url: string; // Legacy support - will map to path
  uploadedAt: string;
  uploadedBy: string;
  status: string;
  category?: number;
  docketId: number;
  entityId?: number; // Post ID for post uploads
  userId?: string; // User ID who uploaded
  subFolder?: string; // Custom subfolder within category
}

export interface Document {
  id: number;
  fileName: string;
  altText?: string;
  caption?: string;
  contentType: string;
  fileSize: number;
  path: string;
  thumbnailPath: string;
  docketId: number;
  uploadedAt: string;
  uploadedBy: string;
  status: string;
  category: number;
}

export interface Docket {
  id: number;
  name: string;
  documents: Document[];
}

// Post-related enums
export enum PostStatus {
  Draft = 1,
  Published = 2,
  Archived = 3,
}

export interface PostContentCategory {
  id: number;
  name: string;
}

export interface PostCategory {
  id: number;
  name: string;
  code: string;
}

export interface PostTag {
  id: number;
  name: string;
}

export interface PostComment {
  id: number;
  content: string;
  authorId: number;
  author: ApplicationUser;
  createdAt: string;
}

export interface BackendPostDto {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
  description?: string;
  slug: string;
  ownerId?: number;
  owner?: ApplicationUser;
  postCategoryId?: number;
  postCategory?: PostCategory;
  contentCategoryId?: number;
  contentCategory?: PostContentCategory;
  status?: PostStatus;
  tags?: (PostTag | string)[]; // Accept both PostTag objects and strings for flexibility
  contributors?: ApplicationUser[];
  media?: Media[];
  comments?: PostComment[];
  likes: number;
  docketId?: number;
  docket?: Docket;
  createdAt?: string;
  updatedAt?: string;
  excerpt?: string;
  technologies?: string | string[];
  githubUrl?: string;
  liveUrl?: string;
  // Legacy properties for backward compatibility
  author?: string;
  date?: string;
  image?: string;
}

export interface Post extends BackendPostDto {}

export interface Project {
  id: number;
  title: string;
  description?: string;
  image?: string;
  galleryImages?: ImageItem[];
  downloadablePdf?: DownloadableDocument;
  demoVideo?: ProjectDemoVideo;
  demoVideos?: ProjectDemoVideo[];
  link?: string;
  contributors?: string[];
  likes?: number;
  date?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  excerpt?: string;
  // Post-compatible properties
  coverImage?: string;
  content?: string;
  owner?: ApplicationUser;
  tags?: (PostTag | string)[];
  createdAt?: string;
  slug?: string;
  status?: PostStatus;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BackendErrorDetails {
  title: string;
  code: number;
  description: string;
  target: string;
}

export interface BackendApiResponse<T> {
  data: T;
  isSuccess: boolean;
  error: BackendErrorDetails | null;
}
