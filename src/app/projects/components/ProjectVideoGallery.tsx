"use client";

import { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import type { ProjectDemoVideo as ProjectDemoVideoConfig } from "@/types";
import ProjectDemoVideo from "@/app/projects/components/ProjectDemoVideo";

interface ProjectVideoGalleryProps {
  videos: ProjectDemoVideoConfig[];
}

const ProjectVideoGallery = ({ videos }: ProjectVideoGalleryProps) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [videos]);

  if (!videos || videos.length === 0) return null;

  const hasMultipleVideos = videos.length > 1;

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length,
    );
  };

  return (
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
            Demos
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
            Video Gallery
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "3px",
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor:
            theme.palette.mode === "dark" ? "#120F0D" : "#F7F3EC",
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {videos.map((video, index) => {
              const isPortrait = video.aspectRatio === "9 / 16";

              return (
                <Box
                  key={`${video.provider}-${video.videoId}`}
                  sx={{
                    flex: "0 0 100%",
                    width: "100%",
                    p: { xs: 2, sm: 3 },
                    boxSizing: "border-box",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: isPortrait
                        ? { xs: 260, sm: 340, md: 400 }
                        : "100%",
                      mx: "auto",
                    }}
                  >
                    <Typography
                      variant="overline"
                      color="secondary"
                      sx={{
                        display: "block",
                        fontFamily: "var(--font-mono), monospace",
                        fontWeight: 700,
                        letterSpacing: 1,
                        mb: 1,
                      }}
                    >
                      {video.sectionTitle || video.title}
                    </Typography>
                    <ProjectDemoVideo
                      video={video}
                      isActive={index === currentIndex}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {hasMultipleVideos && (
          <>
            <IconButton
              aria-label="Previous video"
              onClick={prevVideo}
              sx={{
                position: "absolute",
                left: { xs: 8, sm: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              aria-label="Next video"
              onClick={nextVideo}
              sx={{
                position: "absolute",
                right: { xs: 8, sm: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {hasMultipleVideos && (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 2 }}
        >
          {videos.map((video, index) => (
            <Box
              key={`${video.provider}-${video.videoId}-indicator`}
              component="button"
              type="button"
              aria-label={`Show video ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                p: 0,
                border: 0,
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor:
                  index === currentIndex
                    ? theme.palette.text.primary
                    : theme.palette.action.disabled,
                "&:hover": {
                  backgroundColor:
                    index === currentIndex
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ProjectVideoGallery;
