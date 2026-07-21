"use client";

import React from "react";
import ArticleStatusCard from "@/components/article/ArticleStatusCard";

const ProjectNotFound = () => (
  <ArticleStatusCard
    title="404"
    message="Project not found"
    description="The project you're looking for doesn't exist or may have been moved."
    backHref="/projects"
    backLabel="Back to Projects"
  />
);

export default ProjectNotFound;
