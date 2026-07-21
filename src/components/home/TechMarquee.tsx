"use client";
import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { allSkills } from "@/features/skills.config";

/**
 * Infinite horizontal marquee of the tech stack, edges masked so the
 * chips fade in/out. The track holds the list twice and translates by
 * -50% for a seamless loop; hover pauses it.
 */
const TechMarquee = () => {
  const theme = useTheme();

  const renderChips = (ariaHidden: boolean) =>
    allSkills.map((skill) => (
      <Stack
        key={`${ariaHidden ? "dup-" : ""}${skill.id}`}
        aria-hidden={ariaHidden || undefined}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 2,
          py: 0.9,
          borderRadius: "2px",
          border: `1px solid ${theme.palette.divider}`,
          background: "transparent",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "border-color 0.2s, color 0.2s",
          color: "text.secondary",
          "&:hover": {
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "inherit", lineHeight: 1 }}
        >
          {skill.label}
        </Typography>
      </Stack>
    ));

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "text.disabled",
          mb: 3,
        }}
      >
        Technologies I work with
      </Typography>
      <Box
        sx={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          "&:hover .marquee-track": { animationPlayState: "paused" },
        }}
      >
        <Stack
          className="marquee-track"
          direction="row"
          spacing={1.5}
          sx={{
            width: "max-content",
            animation: "marquee-scroll 45s linear infinite",
            pr: 1.5,
          }}
        >
          {renderChips(false)}
          {renderChips(true)}
        </Stack>
      </Box>
    </Box>
  );
};

export default TechMarquee;
