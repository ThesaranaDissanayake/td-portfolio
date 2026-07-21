// src/components/Reveal.tsx

"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

interface RevealProps {
  children: React.ReactNode;
  /** Animation delay in seconds, useful for staggering siblings */
  delay?: number;
  sx?: SxProps<Theme>;
}

/**
 * Fades content up into view the first time it enters the viewport.
 * Falls back to always-visible when JS is disabled via the .reveal
 * defaults in globals.css and respects prefers-reduced-motion.
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, sx }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}`}
      sx={{ animationDelay: `${delay}s`, ...sx }}
    >
      {children}
    </Box>
  );
};

export default Reveal;
