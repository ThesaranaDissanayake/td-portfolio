"use client";

import React from "react";
import {
  Typography,
  Box,
  Link,
  Paper,
  Chip,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// Styled components for enhanced MDX rendering
const StyledImage = styled(Image)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  maxWidth: "100%",
  height: "auto",
  display: "block",
  margin: `${theme.spacing(2)} auto`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[8],
  },
}));

const CodeBlock = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.4)"
      : "rgba(0, 0, 0, 0.03)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  overflow: "auto",
  border: `1px solid ${theme.palette.divider}`,
  "& pre": {
    margin: 0,
    background: "transparent !important",
  },
  "& code": {
    background: "transparent !important",
    fontSize: "0.875rem",
    fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
  },
}));

const InlineCode = styled("code")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.08)",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
  borderRadius: theme.spacing(0.5),
  padding: `${theme.spacing(0.25)} ${theme.spacing(0.75)}`,
  fontSize: "0.875em",
  fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
  fontWeight: 500,
}));

const StyledBlockquote = styled("blockquote")(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.02)"
      : "rgba(0, 0, 0, 0.02)",
  margin: `${theme.spacing(2)} 0`,
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  borderRadius: `0 ${theme.spacing(1)} ${theme.spacing(1)} 0`,
  fontStyle: "italic",
  position: "relative",
  "&::before": {
    content: '"""',
    fontSize: "3rem",
    color: theme.palette.primary.main,
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    opacity: 0.3,
    fontFamily: "serif",
  },
  "& p": {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));

const StyledTable = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: "3px",
  border: `1px solid ${theme.palette.divider}`,
  // The container is the scroll viewport; keep it bounded to its parent so
  // the wide table (minWidth 650) scrolls horizontally within it on mobile.
  display: "block",
  width: "100%",
  maxWidth: "100%",
  overflowX: "auto",
  "& .MuiTable-root": {
    minWidth: 650,
  },
  "& .MuiTableHead-root": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.03)",
  },
  "& .MuiTableCell-head": {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  "& .MuiTableRow-root:nth-of-type(even)": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.02)"
        : "rgba(0, 0, 0, 0.02)",
  },
}));

type SafeImageSource =
  | {
      src: string;
      isRemote: false;
    }
  | {
      src: string;
      isRemote: true;
    };

const getSafeImageSource = (value: unknown): SafeImageSource | null => {
  if (typeof value !== "string") {
    return null;
  }

  const src = value.trim();

  if (!src || /[\u0000-\u001f\u007f]/.test(src)) {
    return null;
  }

  if (src.startsWith("/") && !src.startsWith("//")) {
    return { src, isRemote: false };
  }

  try {
    const parsedUrl = new URL(src);

    if (parsedUrl.protocol === "https:") {
      return { src: parsedUrl.toString(), isRemote: true };
    }
  } catch {
    return null;
  }

  return null;
};

const parseImageDimension = (value: unknown) => {
  const parsedValue = Number.parseInt(String(value), 10);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : undefined;
};

const openSafeImageSource = (src: string) => {
  const openedWindow = window.open(src, "_blank", "noopener,noreferrer");

  if (openedWindow) {
    openedWindow.opener = null;
  }
};

// Custom image component that handles local and HTTPS images only.
const MdxImage = ({ src, alt, width, height, title, ...props }: any) => {
  const theme = useTheme();
  const safeImageSource = getSafeImageSource(src);

  if (!safeImageSource) return null;

  // Parse dimensions if they're strings
  const imgWidth = parseImageDimension(width);
  const imgHeight = parseImageDimension(height);
  const imageAlt = typeof alt === "string" && alt.trim() ? alt : "Image";
  const imageTitle = typeof title === "string" ? title : undefined;

  // Render HTTPS images with a plain img tag because Next image optimization
  // is intentionally limited to local/public assets in next.config.js.
  if (safeImageSource.isRemote) {
    return (
      <Box sx={{ textAlign: "center", my: 3 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...props}
          src={safeImageSource.src}
          alt={imageAlt}
          title={imageTitle}
          style={{
            maxWidth: "100%",
            height: "auto",
            width: imgWidth ? `${imgWidth}px` : "auto",
            maxHeight: imgHeight ? `${imgHeight}px` : "none",
            borderRadius: theme.spacing(2),
            boxShadow: theme.shadows[4],
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onClick={() => {
            // Open image in new tab on click
            openSafeImageSource(safeImageSource.src);
          }}
        />
        {(alt || title) && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mt: 1,
              fontStyle: "italic",
              maxWidth: "80%",
            }}
          >
            {alt || title}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", my: 3 }}>
      <StyledImage
        {...props}
        src={safeImageSource.src}
        alt={imageAlt}
        width={imgWidth || 800}
        height={imgHeight || 450}
        style={{
          maxWidth: "100%",
          height: "auto",
          cursor: "pointer",
        }}
        onClick={() => {
          // Open image in new tab on click
          openSafeImageSource(safeImageSource.src);
        }}
      />
      {(alt || title) && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1, fontStyle: "italic" }}
        >
          {alt || title}
        </Typography>
      )}
    </Box>
  );
};

// Custom code component with syntax highlighting
const MdxCode = ({ children, className, ...props }: any) => {
  const theme = useTheme();
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  if (match) {
    return (
      <CodeBlock elevation={0}>
        <SyntaxHighlighter
          style={theme.palette.mode === "dark" ? atomDark : oneLight}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: "transparent",
            fontSize: "0.875rem",
            fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </CodeBlock>
    );
  }

  return <InlineCode {...props}>{children}</InlineCode>;
};

// Custom table component
const MdxTable = ({ children, ...props }: any) => {
  return (
    <StyledTable>
      <Table {...props}>{children}</Table>
    </StyledTable>
  );
};

// MDX component mapping
export const mdxComponents = {
  // Headings
  h1: (props: any) => (
    <Typography
      variant="h3"
      component="h1"
      sx={{
        fontWeight: 700,
        mt: { xs: 3, md: 4 },
        mb: 2,
        fontSize: { xs: "1.5rem", md: "inherit" },
        color: "text.primary",
        lineHeight: 1.2,
      }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        fontWeight: 600,
        mt: { xs: 2.5, md: 3.5 },
        mb: 1.5,
        fontSize: { xs: "1.25rem", md: "inherit" },
        color: "text.primary",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <Typography
      variant="h1"
      component="h3"
      sx={{
        fontWeight: 600,
        mt: 3,
        mb: 1.5,
        color: "text.primary",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  h4: (props: any) => (
    <Typography
      variant="h6"
      component="h4"
      sx={{
        fontWeight: 600,
        mt: 2.5,
        mb: 1,
        color: "text.primary",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  h5: (props: any) => (
    <Typography
      variant="subtitle1"
      component="h5"
      sx={{
        fontWeight: 600,
        mt: 2.5,
        mb: 1,
        color: "text.primary",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  h6: (props: any) => (
    <Typography
      variant="subtitle2"
      component="h6"
      sx={{
        fontWeight: 600,
        mt: 1.5,
        mb: 0.75,
        color: "text.primary",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),

  // Paragraphs and text
  p: (props: any) => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        lineHeight: { xs: 1.6, md: 1.7 },
        mb: 2,
        color: "text.secondary",
        fontSize: { xs: "1rem", md: "1.05rem" },
      }}
      {...props}
    />
  ),

  // Lists
  ul: (props: any) => (
    <Box
      component="ul"
      sx={{
        pl: 3,
        mb: 2,
        "& li": {
          mb: 1,
          lineHeight: 1.7,
          color: "text.secondary",
        },
        "& li::marker": {
          color: "primary.main",
        },
      }}
      {...props}
    />
  ),
  ol: (props: any) => (
    <Box
      component="ol"
      sx={{
        pl: 3,
        mb: 2,
        "& li": {
          mb: 1,
          lineHeight: 1.7,
          color: "text.secondary",
        },
        "& li::marker": {
          color: "primary.main",
          fontWeight: 600,
        },
      }}
      {...props}
    />
  ),

  // Links
  a: (props: any) => (
    <Link
      sx={{
        color: "primary.light",
        textDecoration: "none",
        fontWeight: 500,
        borderBottom: "1px solid transparent",
        transition: "all 0.2s ease",
        "&:hover": {
          borderBottomColor: "primary.light",
          textDecoration: "none",
        },
      }}
      {...props}
    />
  ),

  // Media
  img: MdxImage,

  // Code
  code: MdxCode,
  pre: (props: any) => <div {...props} />, // Let the code component handle pre

  // Blockquote
  blockquote: (props: any) => <StyledBlockquote {...props} />,

  // Horizontal rule
  hr: (props: any) => (
    <Divider
      sx={{
        my: 3,
        borderColor: "divider",
        "&::before, &::after": {
          borderColor: "primary.main",
        },
      }}
      {...props}
    />
  ),

  // Table elements
  table: MdxTable,
  thead: (props: any) => <TableHead {...props} />,
  tbody: (props: any) => <TableBody {...props} />,
  tr: (props: any) => <TableRow {...props} />,
  th: (props: any) => <TableCell component="th" {...props} />,
  td: (props: any) => <TableCell {...props} />,

  // Strong and emphasis
  strong: (props: any) => (
    <Typography
      component="strong"
      sx={{
        fontWeight: 700,
        color: "text.primary",
      }}
      {...props}
    />
  ),
  em: (props: any) => (
    <Typography
      component="em"
      sx={{
        fontStyle: "italic",
        color: "text.secondary",
      }}
      {...props}
    />
  ),

  // Custom components
  Chip: (props: any) => (
    <Chip
      size="small"
      color="secondary"
      sx={{
        m: 0.5,
        fontWeight: 500,
      }}
      {...props}
    />
  ),
};

export default mdxComponents;
