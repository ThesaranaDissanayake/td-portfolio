"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Divider,
  Stack,
  Breadcrumbs,
  Link,
  Paper,
  IconButton,
  Tooltip,
  Button,
  LinearProgress,
  Fab,
  Fade,
  Modal,
  Backdrop,
  useTheme,
  Snackbar,
} from "@mui/material";
import {
  Favorite,
  Share,
  ArrowBack,
  CalendarToday,
  AccessTime,
  KeyboardArrowUp,
  FormatListBulleted,
  Close,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAddLike } from "@/lib/queries";
import { isRemoteApiConfigured } from "@/lib/apiClient";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import ContactCTA from "@/components/ContactCTA";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";
import { profile } from "@/features/profile.config";
import FallbackImage from "@/components/FallbackImage";
import { IMAGE_FALLBACKS } from "@/lib/images";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ArticlePost {
  id: number;
  title: string;
  content?: string;
  coverImage?: string;
  image?: string;
  createdAt?: string;
  likes?: number;
  tags?: (string | { id?: number; name: string })[];
}

interface ArticleLayoutProps {
  post: ArticlePost;
  backHref: string;
  backLabel: string;
  breadcrumbLabel: string;
  authorName: string;
  authorRole: string;
  infoTitle: string;
  /** Optional subtitle under the title (e.g. project description) */
  subtitle?: string;
  /** Buttons rendered under the article header on smaller screens */
  headerActions?: React.ReactNode;
  /** Optional content rendered between the cover image and article body */
  afterCoverContent?: React.ReactNode;
  /** Extra blocks rendered at the top of the sidebar info card */
  sidebarExtras?: React.ReactNode;
  /** Placeholder used only when a cover image is missing or fails to load */
  coverFallbackSrc?: string;
  /** How the cover image should fit inside its container */
  coverImageFit?: React.CSSProperties["objectFit"];
  /** Optional stable aspect ratio for the cover image container */
  coverImageAspectRatio?: React.CSSProperties["aspectRatio"];
}

/** Shared editorial panel recipe for the article surfaces */
const glassPanel = (mode: "light" | "dark") => ({
  borderRadius: "3px",
  background: mode === "dark" ? "#1C1815" : "#FCFAF5",
  border: `1px solid ${
    mode === "dark" ? "rgba(244,239,231,0.13)" : "rgba(27,23,18,0.12)"
  }`,
});

const LIKED_POSTS_STORAGE_KEY = "liked_posts";

const normalizeLikedPostIds = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((postId) => {
      if (typeof postId === "number") return postId;
      if (typeof postId === "string") return Number(postId);
      return NaN;
    })
    .filter((postId) => Number.isInteger(postId) && postId > 0);
};

const readLikedPostIds = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(LIKED_POSTS_STORAGE_KEY);
    return normalizeLikedPostIds(storedValue ? JSON.parse(storedValue) : []);
  } catch (error) {
    console.warn("Ignoring invalid liked post state:", error);
    return [];
  }
};

const writeLikedPostIds = (postIds: number[]) => {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedPostIds = Array.from(new Set(normalizeLikedPostIds(postIds)));

  try {
    window.localStorage.setItem(
      LIKED_POSTS_STORAGE_KEY,
      JSON.stringify(normalizedPostIds),
    );
  } catch (error) {
    console.warn("Unable to persist liked post state:", error);
  }
};

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  post,
  backHref,
  backLabel,
  breadcrumbLabel,
  authorName,
  authorRole,
  infoTitle,
  subtitle,
  headerActions,
  afterCoverContent,
  sidebarExtras,
  coverFallbackSrc = IMAGE_FALLBACKS.project,
  coverImageFit = "cover",
  coverImageAspectRatio,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [hasAuthorAvatarError, setHasAuthorAvatarError] = useState(false);

  // Local storage is only a confirmed remote-like marker.
  const addLikeMutation = useAddLike();
  const likeRequestInFlightRef = React.useRef(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(post.likes || 0);
  const isLikeDisabled =
    !isRemoteApiConfigured || hasLiked || addLikeMutation.isPending;

  useEffect(() => {
    setLikeCount(post.likes || 0);

    if (!isRemoteApiConfigured) {
      setHasLiked(false);
      return;
    }

    setHasLiked(readLikedPostIds().includes(post.id));
  }, [post.id, post.likes]);

  // Reading progress + scroll-to-top visibility
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowScrollToTop(scrollTop > 300);
    };
    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  // Extract TOC from rendered content
  useEffect(() => {
    if (!post.content) return;
    const timeout = setTimeout(() => {
      const headings = document.querySelectorAll(
        ".mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6",
      );
      const tocData: TocItem[] = [];
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || "";
        const id = `heading-${index}`;
        heading.id = id;
        tocData.push({ id, text, level });
      });
      setTocItems(tocData);
    }, 100);
    return () => clearTimeout(timeout);
  }, [post.content]);

  // Track the active heading while scrolling
  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -60% 0%", threshold: 0 },
    );
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  const estimatedReadingTime = React.useMemo(() => {
    if (!post.content) return 0;
    return Math.ceil(post.content.split(" ").length / 200);
  }, [post.content]);

  const handleBackClick = () => router.push(backHref);
  const coverImage = post.coverImage || post.image;
  const shouldPreserveFullCover = coverImageFit === "contain";
  const authorAvatarSrc =
    hasAuthorAvatarError || !profile.avatarImageUrl
      ? IMAGE_FALLBACKS.profile
      : profile.avatarImageUrl;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title || `${breadcrumbLabel} by ${profile.fullName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
    }
  };

  const handleLike = () => {
    if (isLikeDisabled || likeRequestInFlightRef.current) return;

    const previousHasLiked = hasLiked;
    const previousLikeCount = likeCount;

    likeRequestInFlightRef.current = true;
    setHasLiked(true);
    setLikeCount((prev) => prev + 1);

    addLikeMutation.mutate(
      { id: post.id, likes: 1 },
      {
        onSuccess: () => {
          writeLikedPostIds([...readLikedPostIds(), post.id]);
        },
        onError: () => {
          setHasLiked(previousHasLiked);
          setLikeCount(previousLikeCount);
        },
        onSettled: () => {
          likeRequestInFlightRef.current = false;
        },
      },
    );
  };

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 120, behavior: "smooth" });
    }
  };

  const renderTag = (
    tag: string | { id?: number; name: string },
    index: number,
  ) => {
    const tagName = typeof tag === "string" ? tag : tag.name;
    const tagKey = typeof tag === "string" ? tag : tag.id;
    return (
      <Chip
        key={tagKey || index}
        label={tagName}
        size="small"
        sx={{
          background: "transparent",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "2px",
          color: "text.secondary",
          fontFamily: "var(--font-mono), monospace",
          fontWeight: 500,
          fontSize: "0.68rem",
        }}
      />
    );
  };

  const renderTocButtons = (onNavigate?: () => void) =>
    tocItems.map((item) => {
      const isActive = activeHeading === item.id;
      return (
        <Button
          key={item.id}
          onClick={() => {
            scrollToHeading(item.id);
            onNavigate?.();
          }}
          sx={{
            justifyContent: "flex-start",
            textAlign: "left",
            textTransform: "none",
            pl: 1 + (item.level - 1) * 1.5,
            pr: 2,
            py: 0.75,
            minHeight: "auto",
            color: isActive ? "secondary.main" : "text.secondary",
            backgroundColor: isActive
              ? isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)"
              : "transparent",
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: isActive ? 600 : 400,
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          {item.text}
        </Button>
      );
    });

  return (
    <>
      {/* Reading progress bar */}
      <LinearProgress
        variant="determinate"
        value={readingProgress}
        sx={{
          position: "fixed",
          top: { xs: "64px", md: 0 },
          left: 0,
          right: 0,
          zIndex: 2000,
          height: 3,
          backgroundColor: "transparent",
          "& .MuiLinearProgress-bar": { backgroundColor: "secondary.main" },
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          py: { xs: 3, md: 4 },
          pt: PAGE_TOP_PADDING,
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Navigation header */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBackClick}
              disableRipple
              sx={{
                color: "text.secondary",
                textTransform: "none",
                borderRadius: 0,
                px: 0,
                borderBottom: `1px solid transparent`,
                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "transparent",
                  borderBottomColor: theme.palette.text.primary,
                },
                transition: "color 0.2s ease",
              }}
            >
              {backLabel}
            </Button>

            <Stack direction="row" spacing={1}>
              {tocItems.length > 0 && (
                <Tooltip title="Table of Contents">
                  <IconButton
                    size="small"
                    onClick={() => setShowMobileToc(true)}
                    sx={{ display: { lg: "none" } }}
                  >
                    <FormatListBulleted />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Share">
                <IconButton size="small" onClick={handleShare}>
                  <Share />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Breadcrumbs sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            <Link
              component="button"
              variant="body2"
              onClick={handleBackClick}
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { color: "secondary.main" },
              }}
            >
              {breadcrumbLabel}
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "300px",
              }}
            >
              {post.title}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Article header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.6rem" },
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              mb: 3,
              color: "text.primary",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {post.title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 680,
                mx: "auto",
                mb: 3,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </Typography>
          )}

          <Divider sx={{ mb: 3, display: { xs: "none", sm: "block" } }} />

          {/* Author + meta */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 2, sm: 4 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src={authorAvatarSrc}
                alt={authorName}
                sx={{ width: 44, height: 44 }}
                imgProps={{
                  onError: () => {
                    if (authorAvatarSrc !== IMAGE_FALLBACKS.profile) {
                      setHasAuthorAvatarError(true);
                    }
                  },
                }}
              />
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {authorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {authorRole}
                </Typography>
              </Box>
            </Stack>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Stack
              direction="row"
              spacing={3}
              sx={{
                width: { xs: "100%", sm: "auto" },
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {post.createdAt && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarToday
                    sx={{ fontSize: 16, color: "text.disabled" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Stack>
              )}

              {estimatedReadingTime > 0 && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTime sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="body2" color="text.secondary">
                    {estimatedReadingTime} min read
                  </Typography>
                </Stack>
              )}

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                onClick={handleLike}
                sx={{
                  cursor: isLikeDisabled ? "default" : "pointer",
                  "&:hover": {
                    transform: isLikeDisabled ? "none" : "scale(1.08)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Favorite
                  sx={{
                    fontSize: 16,
                    color: hasLiked ? "secondary.main" : "text.disabled",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {likeCount}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {headerActions && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              {headerActions}
            </Stack>
          )}

          <Divider sx={{ mt: 4, display: { xs: "none", sm: "block" } }} />

          {/* Tags (mobile / tablet — sidebar shows them on lg+) */}
          {post.tags && post.tags.length > 0 && (
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 1, mt: 4, display: { xs: "flex", lg: "none" } }}
            >
              {post.tags.map(renderTag)}
            </Stack>
          )}
        </Box>

        {/* Cover image */}
        {(coverImage || coverFallbackSrc) && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: coverImageAspectRatio
                ? "auto"
                : { xs: 300, sm: 400, md: 500 },
              aspectRatio: coverImageAspectRatio,
              mb: 6,
              borderRadius: "3px",
              overflow: "hidden",
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: shouldPreserveFullCover
                ? isDark
                  ? "#120F0D"
                  : "#F7F3EC"
                : "transparent",
            }}
          >
            <FallbackImage
              src={coverImage}
              fallbackSrc={coverFallbackSrc}
              alt={post.title}
              fill
              style={{ objectFit: coverImageFit }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </Box>
        )}

        {afterCoverContent}

        {/* Content + sidebar */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 300px" },
            gap: 4,
            alignItems: "start",
            // Grid tracks must be allowed to shrink below their content's
            // intrinsic width, otherwise a wide table/code block stretches
            // the whole column past the viewport instead of scrolling.
            minWidth: 0,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              minHeight: "60vh",
              // Same reason — clamp the content column to its grid track so
              // wide MDX blocks scroll inside, not overflow the page.
              minWidth: 0,
              maxWidth: "100%",
              overflow: "hidden",
              ...glassPanel(theme.palette.mode),
            }}
          >
            <MdxRenderer content={post.content || ""} />
          </Paper>

          {/* Sidebar — desktop only */}
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              position: "sticky",
              top: 150,
              alignSelf: "start",
              zIndex: 10,
            }}
          >
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{ p: 2.5, ...glassPanel(theme.palette.mode) }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  {infoTitle}
                </Typography>

                <Stack spacing={2}>
                  {sidebarExtras}

                  {post.tags && post.tags.length > 0 && (
                    <>
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1.5 }}
                        >
                          Tags
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {post.tags.map(renderTag)}
                        </Box>
                      </Box>
                      <Divider />
                    </>
                  )}

                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Reading Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={readingProgress}
                      sx={{
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          backgroundColor: "secondary.main",
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {Math.round(readingProgress)}% completed
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Share this {infoTitle.split(" ")[0].toLowerCase()}
                    </Typography>
                    <Tooltip title="Share">
                      <IconButton
                        size="small"
                        onClick={handleShare}
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "white",
                          "&:hover": { backgroundColor: "secondary.dark" },
                        }}
                      >
                        <Share fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </Paper>

              {tocItems.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    ...glassPanel(theme.palette.mode),
                    maxHeight: "calc(100vh - 500px)",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-track": { background: "transparent" },
                    "&::-webkit-scrollbar-thumb": {
                      background: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Table of Contents
                  </Typography>
                  <Stack spacing={0.5}>{renderTocButtons()}</Stack>
                </Paper>
              )}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <ContactCTA />
        </Box>
      </Container>

      {/* Mobile TOC modal */}
      <Modal
        open={showMobileToc}
        onClose={() => setShowMobileToc(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
      >
        <Fade in={showMobileToc}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "400px" },
              maxHeight: "80vh",
              overflowY: "auto",
              outline: "none",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                ...glassPanel(theme.palette.mode),
                background: isDark
                  ? "rgba(28, 24, 21, 0.98)"
                  : "rgba(252, 250, 245, 0.98)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mb: 3,
                  pb: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Table of Contents
                </Typography>
                <IconButton
                  onClick={() => setShowMobileToc(false)}
                  size="small"
                  sx={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.05)",
                  }}
                >
                  <Close />
                </IconButton>
              </Stack>
              <Stack spacing={0.5}>
                {renderTocButtons(() => setShowMobileToc(false))}
              </Stack>
            </Paper>
          </Box>
        </Fade>
      </Modal>

      {/* Scroll to top */}
      <Fade in={showScrollToTop}>
        <Fab
          onClick={scrollToTop}
          size="medium"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            backgroundColor: "secondary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "secondary.dark",
              transform: "scale(1.08)",
            },
            transition: "all 0.3s ease",
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Fade>

      <Snackbar
        open={showShareToast}
        autoHideDuration={3000}
        onClose={() => setShowShareToast(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default ArticleLayout;
