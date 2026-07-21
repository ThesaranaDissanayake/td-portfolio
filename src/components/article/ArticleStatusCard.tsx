"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBack, Home, Refresh } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";

interface ArticleStatusCardProps {
  title: string;
  message: string;
  description?: string;
  backHref: string;
  backLabel: string;
  /** Renders a "Try Again" button when provided (error boundaries) */
  onRetry?: () => void;
  /** Extra dev-only details (e.g. error digest) */
  devDetails?: string;
}

const pillButton = {
  px: 3,
  py: 1,
  fontWeight: 600,
  textTransform: "none" as const,
};

/** Shared error / not-found panel for article pages. */
const ArticleStatusCard: React.FC<ArticleStatusCardProps> = ({
  title,
  message,
  description,
  backHref,
  backLabel,
  onRetry,
  devDetails,
}) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: PAGE_TOP_PADDING, pb: 8, minHeight: "100vh" }}
    >
      <Box
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "3px",
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
          textAlign: "center",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "secondary.main",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 700, letterSpacing: "-0.02em", mt: 1, mb: 2 }}
        >
          {message}
        </Typography>

        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBack />}
            onClick={() => router.push(backHref)}
            sx={pillButton}
          >
            {backLabel}
          </Button>
          <Button
            startIcon={<Home />}
            onClick={() => router.push("/")}
            sx={{
              ...pillButton,
              color: "text.primary",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            Go Home
          </Button>
          {onRetry && (
            <Button
              startIcon={<Refresh />}
              onClick={onRetry}
              sx={{ ...pillButton, color: "text.secondary" }}
            >
              Try Again
            </Button>
          )}
        </Stack>

        {devDetails && process.env.NODE_ENV === "development" && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: "12px",
              border: `1px solid ${theme.palette.divider}`,
              textAlign: "left",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
            >
              {devDetails}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ArticleStatusCard;
