"use client";
import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import { profile } from "@/features/profile.config";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    title: "GitHub",
    href: profile.githubUrl,
    icon: <GitHubIcon fontSize="small" />,
  },
  {
    title: "LinkedIn",
    href: profile.linkedInUrl,
    icon: <LinkedInIcon fontSize="small" />,
  },
  {
    title: "Email",
    href: `mailto:${profile.email}`,
    icon: <EmailIcon fontSize="small" />,
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: "background.default",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 4 }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}
            >
              {profile.fullName}
              <Box component="span" sx={{ color: "secondary.main" }}>
                .
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, maxWidth: 360 }}
            >
              Digital transformation practitioner building automation,
              reporting, and business systems that make operations easier to
              run.
            </Typography>
          </Box>

          <Stack spacing={2} alignItems={{ xs: "flex-start", md: "flex-end" }}>
            <Stack
              direction="row"
              spacing={3}
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
              {navLinks.map((link) => (
                <Typography
                  key={link.href}
                  component={Link}
                  href={link.href}
                  variant="overline"
                  sx={{
                    color: "text.secondary",
                    transition: "color 0.2s",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>

            <Stack direction="row" spacing={0.5}>
              {socials.map((social) => (
                <Tooltip key={social.title} title={social.title}>
                  <IconButton
                    component="a"
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel="noopener noreferrer"
                    size="small"
                    disableRipple
                    sx={{
                      color: "text.secondary",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      borderRadius: "2px",
                      transition: "all 0.2s",
                      "&:hover": {
                        color: "text.primary",
                        borderColor: "text.primary",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1}
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 3,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" color="text.disabled">
            © {new Date().getFullYear()} {profile.fullName}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Designed & built with Next.js
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
