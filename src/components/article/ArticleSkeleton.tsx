"use client";
import React from "react";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";

/** Loading placeholder mirroring the ArticleLayout structure. */
const ArticleSkeleton = () => (
  <Container
    maxWidth={false}
    sx={{
      maxWidth: "1200px",
      mx: "auto",
      py: { xs: 3, md: 4 },
      pt: PAGE_TOP_PADDING,
      px: { xs: 2, md: 3 },
      minHeight: "100vh",
    }}
  >
    <Skeleton variant="text" width={140} sx={{ mb: 4 }} />
    <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
      <Skeleton variant="text" width="70%" height={56} />
      <Skeleton variant="text" width="45%" height={56} />
      <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
        <Skeleton variant="circular" width={44} height={44} />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={90} />
      </Stack>
    </Stack>
    <Skeleton
      variant="rounded"
      sx={{ borderRadius: "3px", height: { xs: 300, md: 460 }, mb: 6 }}
    />
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "1fr 300px" },
        gap: 4,
      }}
    >
      <Stack spacing={1.5}>
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} variant="text" width={`${95 - (i % 3) * 10}%`} />
        ))}
      </Stack>
      <Skeleton
        variant="rounded"
        height={280}
        sx={{ borderRadius: "3px", display: { xs: "none", lg: "block" } }}
      />
    </Box>
  </Container>
);

export default ArticleSkeleton;
