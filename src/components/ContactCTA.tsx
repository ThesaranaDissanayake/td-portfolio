"use client";

import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { profile } from "@/features/profile.config";

const DETAILS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
];

const ContactCTA = () => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        pt: { xs: 6, md: 9 },
        pb: { xs: 2, md: 4 },
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="overline" sx={{ color: "secondary.main" }}>
        03 - Contact
      </Typography>

      <Typography
        variant="h2"
        sx={{
          mt: 2,
          fontSize: { xs: "2.2rem", md: "3.25rem" },
          maxWidth: 720,
        }}
      >
        Let&apos;s build something{" "}
        <Box
          component="em"
          sx={{ color: "secondary.main", fontStyle: "italic" }}
        >
          worth shipping.
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 3, maxWidth: 620, color: "text.secondary" }}
      >
        I&apos;m open to digital transformation, automation, reporting, and
        software engineering opportunities where practical systems can create
        measurable business value.
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 6 }}
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{ mt: { xs: 5, md: 6 } }}
      >
        <Button
          component={Link}
          href="/contact"
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
          Start a conversation
        </Button>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 5 }}
        >
          {DETAILS.map((d) => (
            <Box key={d.label}>
              <Typography
                variant="overline"
                sx={{ color: "text.disabled", display: "block" }}
              >
                {d.label}
              </Typography>
              <Typography
                component="a"
                href={d.href}
                sx={{
                  mt: 0.5,
                  display: "inline-block",
                  fontWeight: 500,
                  color: "text.primary",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.2s",
                  "&:hover": { borderBottomColor: "text.primary" },
                }}
              >
                {d.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactCTA;
