import { Project, PaginatedResponse } from "@/types";
import { portfolioProjects } from "@/features/projects.config";

export const mockProjects: Project[] = portfolioProjects;

export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedResponse<T> => {
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const searchData = <
  T extends { title: string; description?: string; content?: string },
>(
  data: T[],
  query: string,
): T[] => {
  const searchTerm = query.toLowerCase();
  return data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm)) ||
      (item.content && item.content.toLowerCase().includes(searchTerm)),
  );
};
