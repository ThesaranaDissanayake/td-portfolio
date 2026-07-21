import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Alert, CircularProgress, Box } from "@mui/material";
import { useState, useEffect } from "react";

// Generic loading component
export const LoadingSpinner = ({ size = 60 }: { size?: number }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <CircularProgress size={size} color="secondary" />
  </Box>
);

// Generic error component
export const ErrorMessage = ({
  error,
  message,
}: {
  error?: unknown;
  message?: string;
}) => (
  <Alert severity="error" sx={{ mt: 2 }}>
    {message ||
      `An error occurred: ${(error as { message?: string })?.message || "Unknown error"}`}
  </Alert>
);

// Hook for handling query states
export const useQueryWithErrorHandling = <TData, TError>(
  query: UseQueryResult<TData, TError>,
) => {
  const { data, isLoading, isError, error } = query;

  const LoadingComponent = () => <LoadingSpinner />;
  const ErrorComponent = () => <ErrorMessage error={error} />;

  return {
    data,
    isLoading,
    isError,
    error,
    LoadingComponent,
    ErrorComponent,
  };
};

// Hook for search functionality
export const useSearch = (initialQuery = "") => {
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  return {
    search,
    setSearch,
    debouncedSearch,
  };
};

// Hook for pagination
export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const resetPage = () => setPage(1);

  return {
    page,
    setPage,
    handlePageChange,
    resetPage,
  };
};
