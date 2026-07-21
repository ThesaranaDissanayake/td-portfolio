"use client";
import type { Project } from "@/types";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  useTheme,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import { Launch, ArrowForward, GitHub } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FallbackImage from "@/components/FallbackImage";
import { IMAGE_FALLBACKS } from "@/lib/images";

interface ProjectCardProps {
  project: Project;
}

const getTagName = (tag: NonNullable<Project["tags"]>[number]) =>
  typeof tag === "string" ? tag : tag.name;

const getProjectTechnologies = (project: Project) =>
  project.technologies?.length
    ? project.technologies
    : project.tags?.map(getTagName).filter(Boolean) || [];

const ProjectCard = ({ project }: ProjectCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const image = project.image || project.coverImage;

  // Clean description helper
  const cleanDescription = (desc: string) => {
    if (!desc) return "";
    return desc
      .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
      .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // Keep link text, remove url
      .replace(/#{1,6}\s?/g, "") // Remove headers
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
      .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
      .replace(/`{3}[\s\S]*?`{3}/g, "") // Remove code blocks
      .replace(/`(.+?)`/g, "$1") // Remove inline code
      .replace(/>\s?/g, "") // Remove blockquotes
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim();
  };

  const rawDescription = project.description || project.content || "";
  const description = cleanDescription(rawDescription).substring(0, 150);

  const technologies = getProjectTechnologies(project);
  const date = project.date || project.createdAt;
  const liveUrl = project.link || project.liveUrl;
  const githubUrl = project.githubUrl;
  const slug = project.slug || `project-${project.id}`;

  const handleCardClick = () => {
    router.push(`/projects/${slug}`);
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "100%",
        borderRadius: "3px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: (theme) => theme.palette.background.paper,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        transition: "border-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: (theme) => theme.palette.text.primary,
          "& .project-image": {
            transform: "scale(1.04)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", height: 220 }}>
        <FallbackImage
          src={image}
          fallbackSrc={IMAGE_FALLBACKS.project}
          alt={project.title}
          fill
          className="project-image"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay - subtle */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.35) 100%)",
            opacity: 0.7,
          }}
        />

        {/* Floating Actions (Bookmark + Links) */}
        <Fade in={isHovered}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ position: "absolute", top: 12, right: 12 }}
          >
            {liveUrl && (
              <Tooltip title="Live Demo">
                <IconButton
                  onClick={(e) => handleExternalLink(e, liveUrl)}
                  size="small"
                  sx={{
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "black",
                    "&:hover": { background: "white" },
                  }}
                >
                  <Launch sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
            {githubUrl && (
              <Tooltip title="GitHub">
                <IconButton
                  onClick={(e) => handleExternalLink(e, githubUrl)}
                  size="small"
                  sx={{
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "black",
                    "&:hover": { background: "white" },
                  }}
                >
                  <GitHub sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Fade>
      </Box>

      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: "0.7rem",
            }}
          >
            {date
              ? new Date(date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })
              : "Recent"}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: "1.35rem",
              lineHeight: 1.25,
              color: theme.palette.text.primary,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexGrow: 1,
            fontSize: "0.9rem",
          }}
        >
          {description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {technologies?.slice(0, 3).map((tech: string, index: number) => (
            <Chip
              key={tech || index}
              label={tech}
              size="small"
              sx={{
                fontSize: "0.68rem",
                height: 24,
                fontWeight: 500,
                borderRadius: "2px",
                fontFamily: "var(--font-mono), monospace",
                border: `1px solid ${theme.palette.divider}`,
                background: "transparent",
                color: theme.palette.text.secondary,
              }}
            />
          ))}
          {technologies && technologies.length > 3 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ alignSelf: "center" }}
            >
              +{technologies.length - 3}
            </Typography>
          )}
        </Stack>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="button"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              fontSize: "0.85rem",
              opacity: isHovered ? 1 : 0.8,
              transform: isHovered ? "translateX(4px)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            Read Case Study <ArrowForward sx={{ fontSize: 16, ml: 0.5 }} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
