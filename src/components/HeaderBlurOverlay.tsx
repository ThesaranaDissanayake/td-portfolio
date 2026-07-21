"use client";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

/**
 * HeaderBlurOverlay creates a gradient blur effect below the header
 * that gradually fades from top to bottom, providing visual separation
 * between the header and page content.
 */
const HeaderBlurOverlay: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: { xs: "140px", sm: "130px", md: "160px" }, // Extends below header
        zIndex: 1200, // Just below header (1201) but above content
        pointerEvents: "none", // Allow clicks to pass through
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to bottom, rgba(20, 17, 15, 0.95) 0%, rgba(20, 17, 15, 0.7) 40%, rgba(20, 17, 15, 0.3) 70%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(244, 239, 231, 0.95) 0%, rgba(244, 239, 231, 0.7) 40%, rgba(244, 239, 231, 0.3) 70%, transparent 100%)",
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
        display: { xs: "none", md: "block" },
      }}
    />
  );
};

export default HeaderBlurOverlay;
