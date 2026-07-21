"use client";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import Link from "next/link";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";
import { profile } from "@/features/profile.config";

const HERO_IMAGE_SRC = "/my-images/circle.png";

const META = [
  { label: "Role", value: profile.heroRole },
  { label: "Focus", value: profile.heroFocus },
  { label: "Based in", value: profile.location },
];

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        pt: PAGE_TOP_PADDING,
        pb: { xs: 6, md: 9 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: { xs: 2.5, md: 3 },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          {profile.professionalTitle}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              animation: "pulse-dot 2.4s ease-in-out infinite",
            }}
          />
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              display: { xs: "none", sm: "block" },
            }}
          >
            Open to opportunities
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          pt: { xs: 4, md: 6 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) minmax(240px, 340px)",
            lg: "minmax(0, 1fr) minmax(280px, 380px)",
          },
          columnGap: { md: 6, lg: 9 },
          rowGap: { xs: 4.5, sm: 5, md: 3 },
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            minWidth: 0,
          }}
        >
          <Box className="reveal is-visible">
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "3.4rem",
                  sm: "5rem",
                  md: "6.4rem",
                  lg: "7.4rem",
                },
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                fontWeight: 500,
              }}
            >
              {profile.firstName}
              <br />
              {profile.lastName}
              <Box component="span" sx={{ color: "secondary.main" }}>
                .
              </Box>
            </Typography>
          </Box>

          <Typography
            className="reveal is-visible"
            sx={{
              fontFamily: "var(--font-serif), serif",
              fontSize: { xs: "1.35rem", md: "1.75rem" },
              lineHeight: 1.5,
              fontWeight: 400,
              color: "text.primary",
              maxWidth: 760,
              mt: { xs: 4, md: 5 },
            }}
          >
            {profile.heroHeadline}
          </Typography>
        </Box>

        <Box
          className="reveal is-visible"
          sx={{
            order: { xs: 1, md: 2 },
            justifySelf: { xs: "center", md: "end" },
            width: "100%",
            maxWidth: { xs: 280, sm: 320, md: 340, lg: 380 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "min(100%, 380px)",
              mx: { xs: "auto", md: 0 },
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              overflow: "hidden",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              backgroundColor: "background.paper",
            }}
          >
            <Image
              src={HERO_IMAGE_SRC}
              alt={`${profile.fullName} portrait`}
              fill
              priority
              sizes="(max-width: 599px) 70vw, (max-width: 959px) 320px, (max-width: 1279px) 340px, 380px"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            order: 3,
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          {META.map((item, index) => (
            <Box
              key={item.label}
              sx={{
                py: { xs: 2.25, md: 2 },
                px: { xs: 0, sm: 3, md: 3.5 },
                ...(index === 1 && {
                  pl: { sm: 9.5, md: 14 },
                }),
                ...(index === 2 && {
                  pr: { sm: 0, md: 0 },
                  alignItems: { sm: "flex-end" },
                  textAlign: { sm: "right" },
                }),
                minHeight: { md: 96 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                "&:first-of-type": { pl: 0 },
                borderBottom: {
                  xs: (theme) => `1px solid ${theme.palette.divider}`,
                  sm: "none",
                },
                borderRight: {
                  xs: "none",
                  sm: (theme) => `1px solid ${theme.palette.divider}`,
                },
                "&:last-of-type": { borderRight: "none" },
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "text.disabled", display: "block" }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 0.6,
                  fontSize: {
                    xs: "1.05rem",
                    sm:
                      index === 0
                        ? "0.84rem"
                        : index === 1
                          ? "0.96rem"
                          : "1.05rem",
                    md:
                      index === 0
                        ? "0.96rem"
                        : index === 1
                          ? "1rem"
                          : "1.05rem",
                    lg: index === 0 ? "1rem" : "1.05rem",
                  },
                  fontWeight: 500,
                  whiteSpace: index <= 1 ? "nowrap" : "normal",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: "stretch", sm: "center" }}
          sx={{
            order: 4,
            gridColumn: "1 / -1",
            mt: { xs: 0.5, md: 1 },
          }}
        >
          <Button
            component={Link}
            href="/projects"
            disableRipple
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              px: 3.5,
              py: 1.4,
              fontWeight: 600,
              fontSize: "0.95rem",
              transition: "opacity 0.2s ease",
              "&:hover": { backgroundColor: "primary.main", opacity: 0.85 },
            }}
          >
            View selected work
          </Button>

          <Button
            component={Link}
            href="/contact"
            disableRipple
            sx={{
              color: "text.primary",
              px: 0,
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: 0,
              borderBottom: "1px solid transparent",
              "&:hover": {
                backgroundColor: "transparent",
                borderBottomColor: "text.primary",
              },
            }}
          >
            Get in touch
          </Button>

          <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }} />

          <Stack direction="row" spacing={0.5}>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "text.secondary",
                  borderRadius: 0,
                  "&:hover": { color: "text.primary" },
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
                  color: "text.secondary",
                  borderRadius: 0,
                  "&:hover": { color: "text.primary" },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Hero;
