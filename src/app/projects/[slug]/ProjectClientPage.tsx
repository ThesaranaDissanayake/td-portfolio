"use client";

import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Launch, GitHub, Download } from "@mui/icons-material";
import ArticleLayout from "@/components/article/ArticleLayout";
import CustomCarousel from "@/app/about/components/CustomCarousel";
import ProjectVideoGallery from "@/app/projects/components/ProjectVideoGallery";
import type { PortfolioProject } from "@/features/projects.config";
import { profile } from "@/features/profile.config";
import { IMAGE_FALLBACKS } from "@/lib/images";

interface ProjectPageProps {
  projectData: PortfolioProject;
}

const ProjectClientPage = ({ projectData }: ProjectPageProps) => {
  const theme = useTheme();

  const liveUrl = projectData.liveUrl || projectData.link;
  const githubUrl = projectData.githubUrl;
  const downloadablePdf = projectData.downloadablePdf;
  const hasActions = Boolean(liveUrl || githubUrl || downloadablePdf);

  const actionButtons = (
    <>
      {downloadablePdf && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Download />}
          component="a"
          href={downloadablePdf.href}
          download={downloadablePdf.fileName}
          sx={{
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          {downloadablePdf.label}
        </Button>
      )}
      {liveUrl && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Launch />}
          component="a"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Live Demo
        </Button>
      )}
      {githubUrl && (
        <Button
          startIcon={<GitHub />}
          component="a"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: "50px",
            px: 3,
            py: 1,
            fontWeight: 700,
            textTransform: "none",
            color: "text.primary",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              borderColor: "text.secondary",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
            },
          }}
        >
          Source Code
        </Button>
      )}
    </>
  );

  const projectGallery =
    projectData.galleryImages && projectData.galleryImages.length > 0 ? (
      <Box sx={{ mb: 6 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Typography
              variant="overline"
              color="secondary"
              sx={{
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Publication
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "1.6rem", sm: "2rem" },
                fontWeight: 500,
                lineHeight: 1.2,
                color: "text.primary",
              }}
            >
              Project Gallery
            </Typography>
          </Box>
        </Stack>

        <CustomCarousel
          images={projectData.galleryImages}
          fallbackSrc={IMAGE_FALLBACKS.project}
          height={{ xs: 280, sm: 420, md: 540 }}
          imageHeight={{ xs: 280, sm: 420, md: 540 }}
          sx={{
            borderRadius: "3px",
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor:
              theme.palette.mode === "dark" ? "#120F0D" : "#F7F3EC",
          }}
          imageSx={{
            objectFit: "contain",
            borderRadius: 0,
            display: "block",
          }}
        />
      </Box>
    ) : undefined;

  const projectDemoVideos =
    projectData.demoVideos ||
    (projectData.demoVideo ? [projectData.demoVideo] : []);

  const projectVideoGallery =
    projectDemoVideos.length > 0 ? (
      <ProjectVideoGallery videos={projectDemoVideos} />
    ) : undefined;

  const projectMediaSections =
    projectGallery || projectVideoGallery ? (
      <>
        {projectGallery}
        {projectVideoGallery}
      </>
    ) : undefined;

  const sidebarExtras = (
    <>
      {hasActions && (
        <>
          <Stack spacing={1.5}>{actionButtons}</Stack>
          <Divider />
        </>
      )}

      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Project Type
        </Typography>
        <Typography variant="body2" color="text.primary">
          {projectData.type}
        </Typography>
      </Box>
      <Divider />

      {projectData.technologies.length > 0 && (
        <>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Technologies
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {projectData.technologies.map((tech, index) => (
                <Chip
                  key={tech || index}
                  label={tech}
                  size="small"
                  sx={{
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.04)",
                    border: `1px solid ${theme.palette.divider}`,
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Box>
          </Box>
          <Divider />
        </>
      )}
    </>
  );

  return (
    <ArticleLayout
      post={{
        ...projectData,
        coverImage: projectData.coverImage || projectData.image,
      }}
      backHref="/projects"
      backLabel="Back to Projects"
      breadcrumbLabel="Projects"
      authorName={profile.fullName}
      authorRole="Digital Transformation & Software Engineering"
      infoTitle="Project Info"
      subtitle={projectData.summary}
      coverFallbackSrc={IMAGE_FALLBACKS.project}
      coverImageFit="contain"
      coverImageAspectRatio="16 / 9"
      afterCoverContent={projectMediaSections}
      headerActions={
        hasActions ? (
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            {actionButtons}
          </Box>
        ) : undefined
      }
      sidebarExtras={sidebarExtras}
    />
  );
};

export default ProjectClientPage;
