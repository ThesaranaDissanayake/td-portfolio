"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "./MdxComponents";
import { preprocessContent } from "./ContentProcessor";


interface MdxRendererProps {
  content: string;
  className?: string;
}

export const MdxRenderer: React.FC<MdxRendererProps> = ({
  content,
  className,
}) => {
  const theme = useTheme();

  // Preprocess the content to handle HTML img tags and other issues
  const processedContent = preprocessContent(content);

  return (
    <Box
      className={`mdx-content ${className || ""}`}
      sx={{
        // Keep the content from ever forcing the column wider than its
        // container: shrink to fit, and break long unbreakable strings
        // (URLs, tokens) instead of overflowing horizontally.
        minWidth: 0,
        maxWidth: "100%",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        // Genuinely wide blocks scroll inside their own box rather than
        // stretching the article: tables, code, and display math.
        "& .MuiTableContainer-root": {
          maxWidth: "100%",
          overflowX: "auto",
        },
        "& pre": {
          maxWidth: "100%",
          overflowX: "auto",
        },
        // Global styles for the rendered content
        "& .hljs": {
          background:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.4) !important"
              : "rgba(0, 0, 0, 0.03) !important",
          borderRadius: theme.spacing(2),
          padding: theme.spacing(2),
        },
        "& .katex": {
          fontSize: "1.1em",
        },
        "& .katex-display": {
          margin: `${theme.spacing(2)} 0`,
          // Wide display math scrolls inside its box instead of overflowing.
          maxWidth: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "4px",
        },
        // Fix anchor-wrapped headings to preserve heading color
        "& a.anchor": {
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      }}
    >
      <ReactMarkdown
        skipHtml
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
              },
            },
          ],
          rehypeKatex,
        ]}
        components={mdxComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </Box>
  );
};

export default MdxRenderer;
