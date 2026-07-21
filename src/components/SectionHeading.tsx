// src/components/SectionHeading.tsx

"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Editorial section number, e.g. "01". Rendered in rust before the eyebrow. */
  index?: string;
  align?: "center" | "left";
}

/**
 * Editorial section opener: a hairline rule, a mono label row
 * (optional rust section number + eyebrow) and a serif display title.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  index,
  align = "left",
}) => (
  <Box
    sx={{
      textAlign: align,
      mb: { xs: 4, md: 6 },
      pt: { xs: 2.5, md: 3 },
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      display: "flex",
      flexDirection: "column",
      alignItems: align === "center" ? "center" : "flex-start",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 1.25,
        justifyContent: align === "center" ? "center" : "flex-start",
      }}
    >
      {index && (
        <Typography
          variant="overline"
          component="span"
          sx={{ color: "secondary.main" }}
        >
          {index}
        </Typography>
      )}
      <Typography
        variant="overline"
        component="span"
        sx={{ color: "text.secondary" }}
      >
        {eyebrow}
      </Typography>
    </Box>

    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: "1.9rem", md: "2.5rem" },
        mt: 1.5,
        maxWidth: 720,
      }}
    >
      {title}
    </Typography>

    {subtitle && (
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mt: 2,
          maxWidth: 560,
        }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default SectionHeading;
