"use client";

import React from "react";
import ArticleStatusCard from "@/components/article/ArticleStatusCard";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ProjectError = ({ error, reset }: ErrorProps) => (
  <ArticleStatusCard
    title="Projects"
    message="Something went wrong"
    description="The project you're looking for might not exist or there was an error loading it. Please try again or head somewhere else."
    backHref="/projects"
    backLabel="Back to Projects"
    onRetry={reset}
    devDetails={`Error: ${error.message}${error.digest ? `\nDigest: ${error.digest}` : ""}`}
  />
);

export default ProjectError;
