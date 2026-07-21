"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Reveal from "@/components/Reveal";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Extra content under the subtitle (e.g. a search field) */
  children?: React.ReactNode;
}

/**
 * Editorial page opener: a mono eyebrow, a large serif display title and an
 * optional subtitle, left-aligned and anchored by a hairline rule with the
 * fixed-header clearance baked in.
 */
const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  children,
}) => (
  <Box
    sx={{
      pt: PAGE_TOP_PADDING,
      pb: { xs: 4, md: 6 },
      mb: { xs: 4, md: 6 },
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
    }}
  >
    <Reveal>
      <Typography variant="overline" sx={{ color: "secondary.main" }}>
        {eyebrow}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.6rem", sm: "3.4rem", md: "4.25rem" },
          mt: 1.5,
          maxWidth: 900,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mt: 2.5,
            maxWidth: 620,
            fontSize: { xs: "1rem", md: "1.125rem" },
          }}
        >
          {subtitle}
        </Typography>
      )}
      {children && <Box sx={{ mt: 4, width: "100%" }}>{children}</Box>}
    </Reveal>
  </Box>
);

export default PageHero;
