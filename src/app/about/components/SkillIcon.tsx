"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

interface SkillIconProps {
  image?: string;
  placeholderText: string;
}

const SkillIcon = ({ image, placeholderText }: SkillIconProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const showImage = image && !hasImageError;
  const initials = placeholderText
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <Tooltip title={placeholderText} arrow>
      {showImage ? (
        <Box
          component="img"
          src={image}
          alt={placeholderText}
          sx={{
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
            borderRadius: 1,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            objectFit: "contain",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <Box
          sx={(theme) => ({
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
            borderRadius: 1,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
            color: "secondary.main",
            "&:hover": {
              transform: "scale(1.1)",
            },
          })}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: "var(--font-mono), monospace",
              fontWeight: 700,
              fontSize: { xs: "0.68rem", md: "0.72rem" },
            }}
          >
            {initials}
          </Typography>
        </Box>
      )}
    </Tooltip>
  );
};

export default SkillIcon;
