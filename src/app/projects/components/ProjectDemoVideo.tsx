"use client";

import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import type { ProjectDemoVideo as ProjectDemoVideoConfig } from "@/types";

interface ProjectDemoVideoProps {
  video: ProjectDemoVideoConfig;
  isActive?: boolean;
}

const getEmbedSrc = (video: ProjectDemoVideoConfig) => {
  if (video.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&autoplay=1`;
  }

  return undefined;
};

const getThumbnailSrc = (video: ProjectDemoVideoConfig) => {
  if (video.thumbnailSrc) return video.thumbnailSrc;

  if (video.provider === "youtube") {
    return `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
  }

  return undefined;
};

const ProjectDemoVideo = ({ video, isActive = true }: ProjectDemoVideoProps) => {
  const [hasStarted, setHasStarted] = useState(false);
  const embedSrc = getEmbedSrc(video);
  const thumbnailSrc = getThumbnailSrc(video);

  useEffect(() => {
    if (!isActive) {
      setHasStarted(false);
    }
  }, [isActive]);

  if (!embedSrc) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: video.aspectRatio || "16 / 9",
        borderRadius: "3px",
        overflow: "hidden",
      }}
    >
      {hasStarted ? (
        <Box
          component="iframe"
          src={embedSrc}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      ) : (
        <Box
          component="button"
          type="button"
          aria-label={`Play ${video.title}`}
          onClick={() => setHasStarted(true)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            p: 0,
            border: 0,
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: "transparent",
            "&:hover .project-video-thumbnail": {
              transform: "scale(1.03)",
            },
            "&:hover .project-video-play": {
              transform: "translate(-50%, -50%) scale(1.08)",
            },
          }}
        >
          {thumbnailSrc && (
            <Box
              component="img"
              className="project-video-thumbnail"
              src={thumbnailSrc}
              alt=""
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
          )}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.42))",
            }}
          />

          <IconButton
            component="span"
            className="project-video-play"
            aria-hidden="true"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 64, sm: 78 },
              height: { xs: 64, sm: 78 },
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
              transition: "transform 0.2s ease, background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <PlayArrow sx={{ fontSize: { xs: 36, sm: 44 } }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProjectDemoVideo;
