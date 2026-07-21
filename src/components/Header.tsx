"use client";
import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Portal from "@mui/material/Portal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useThemeMode } from "@/theme/ThemeProvider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { profile } from "@/features/profile.config";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { mode, toggleColorMode } = useThemeMode();
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuContentRef.current &&
        !menuContentRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const renderNavButtons = (onClick?: () => void) =>
    navLinks.map((link) => {
      const isActive = isActiveLink(link.href);
      return (
        <Button
          key={link.href}
          component={Link}
          href={link.href}
          color="inherit"
          onClick={onClick}
          disableRipple
          sx={{
            fontFamily: "var(--font-mono), monospace",
            fontWeight: 600,
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            position: "relative",
            borderRadius: 0,
            px: { xs: 1, md: 0 },
            py: 0.75,
            minWidth: "auto",
            transition: "color 0.2s ease",
            color: isActive
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
            backgroundColor: "transparent",
            borderBottom: `1px solid ${
              isActive ? theme.palette.secondary.main : "transparent"
            }`,
            "&:hover": {
              backgroundColor: "transparent",
              color: theme.palette.text.primary,
            },
          }}
        >
          {link.label}
        </Button>
      );
    });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "rgba(244, 239, 231, 0.8)"
            : "rgba(20, 17, 15, 0.8)",
        boxShadow: "none",
        zIndex: 1201,
        left: 0,
        right: 0,
        top: 0,
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "background 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: { xs: 64, sm: 72 },
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          px: { xs: 2.5, md: 3 },
        }}
      >
        {/* Logo and Title */}
        <Stack
          direction="row"
          alignItems="center"
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-serif), serif",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              fontSize: { xs: 19, sm: 21 },
              color: theme.palette.text.primary,
            }}
          >
            {profile.fullName}
            <Box component="span" sx={{ color: "secondary.main" }}>
              .
            </Box>
          </Typography>
        </Stack>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Stack direction="row" alignItems="center" spacing={3}>
            {renderNavButtons()}

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 20,
                alignSelf: "center",
                borderColor: theme.palette.divider,
              }}
            />

            <Stack direction="row" spacing={0.5}>
              <Tooltip title="GitHub">
                <IconButton
                  component="a"
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: theme.palette.text.primary,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  component="a"
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#0a66c2", // LinkedIn Blue
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle light/dark theme">
                <IconButton
                  onClick={toggleColorMode}
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.4s",
                    "&:hover": {
                      color: theme.palette.warning.main,
                      transform: "rotate(90deg)",
                    },
                  }}
                >
                  {mode === "dark" ? (
                    <Brightness7Icon fontSize="small" />
                  ) : (
                    <Brightness4Icon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <Box
            ref={mobileMenuRef}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              onClick={toggleColorMode}
              sx={{
                color: theme.palette.text.primary,
                mr: 1,
              }}
            >
              {mode === "dark" ? (
                <Brightness7Icon fontSize="small" />
              ) : (
                <Brightness4Icon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              sx={{
                color: theme.palette.text.primary,
                transition: "transform 0.2s",
                transform: mobileMenuOpen ? "rotate(90deg)" : "none",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Menu Content */}
            {mobileMenuOpen && (
              <Portal>
                <Box
                  ref={menuContentRef}
                  sx={{
                    position: "fixed",
                    top: "calc(64px + 1px)", // Below navbar
                    left: 0,
                    right: 0,
                    p: 2,
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(244, 239, 231, 0.97)"
                        : "rgba(20, 17, 15, 0.97)",
                    backdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    // Above the About page's sticky section nav (z 1201) so the
                    // dropdown's first item (Home) isn't covered by it.
                    zIndex: 1300,
                    animation: "slideDown 0.3s ease-out forwards",
                    "@keyframes slideDown": {
                      "0%": { opacity: 0, transform: "translateY(-10px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Stack spacing={1}>
                    {renderNavButtons(() => setMobileMenuOpen(false))}
                    <HtmlDivider
                      sx={{ my: 1.5, borderColor: theme.palette.divider }}
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      sx={{ pt: 1 }}
                    >
                      <IconButton
                        component="a"
                        href={profile.githubUrl}
                        target="_blank"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        <GitHubIcon />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={profile.linkedInUrl}
                        target="_blank"
                        sx={{ color: "#0a66c2" }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              </Portal>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Helper for divider to avoid naming conflict if needed,
// though we imported Divider above. Redefining just in case or using standard Divider.
const HtmlDivider = Divider;
