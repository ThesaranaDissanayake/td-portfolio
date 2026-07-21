// src/enum/index.ts

// Re-export PostStatus from types for backward compatibility
export { PostStatus } from "@/types";

export enum DocumentCategory {
  // User-related categories
  UserProfile = 10,
  UserDocument = 11,
  UserPrivate = 12,

  // System categories
  SystemTemplate = 20,
  SystemDefault = 21,

  // Legacy/General
  Product = 30,

  // Miscellaneous
  Temporary = 99,
  Other = 100,
}

export enum ContentCategory {
  Project = 2,
  Article = 3,
}
