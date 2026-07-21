import { createTheme, Theme } from "@mui/material/styles";

export type ColorMode = "light" | "dark";

/**
 * v3 — "Warm editorial" direction.
 * Magazine-like: a confident serif display (Fraunces) paired with a clean
 * grotesque body (Inter) and a mono utility face (JetBrains Mono) for labels
 * and section numbers. Warm paper / ink surfaces, a single restrained rust
 * accent, hairline rules and generous whitespace. No glassmorphism, no glow,
 * no gradient-clipped text.
 */

const commonSettings = {
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 3,
  },
};

const darkPalette = {
  mode: "dark" as const,
  primary: {
    // In dark mode the "primary" ink is warm paper (used for solid buttons).
    main: "#F4EFE7",
    light: "#FFFFFF",
    dark: "#14110F",
    contrastText: "#14110F",
    // Legacy neutral ramp — retinted warm so older components stay on-system.
    dark2: "#1C1815",
    light2: "#2A251F",
    light3: "#39332B",
    lighter: "#7A7267",
    lighter2: "#A79D90",
    lighter3: "#D8D0C4",
  },
  secondary: {
    // Rust — the one accent. Brighter in dark so it reads on warm ink.
    main: "#E4602E",
    light: "#F2794A",
    dark: "#B8461E",
    other: "#D98324",
    contrastText: "#14110F",
  },
  background: {
    default: "#14110F", // warm ink
    paper: "#1C1815", // surface (cards)
  },
  divider: "rgba(244,239,231,0.13)",
  text: {
    primary: "#F4EFE7",
    secondary: "#A79D90",
    disabled: "#7A7267",
    main: "#F4EFE7",
    dark: "#A79D90",
    light: "#FFFFFF",
  },
  common: {
    white: "#FFFFFF",
    lite: "#F4EFE7",
  },
  transparentLevels: {
    1: "rgba(0,0,0,0.1)",
    2: "rgba(0,0,0,0.2)",
    3: "rgba(0,0,0,0.3)",
    4: "rgba(0,0,0,0.4)",
    5: "rgba(0,0,0,0.5)",
    6: "rgba(0,0,0,0.6)",
    7: "rgba(0,0,0,0.7)",
    8: "rgba(0,0,0,0.8)",
    9: "rgba(0,0,0,0.9)",
  },
  transparentLevelsWhite: {
    1: "rgba(244,239,231,0.06)",
    2: "rgba(244,239,231,0.1)",
    3: "rgba(244,239,231,0.16)",
    4: "rgba(244,239,231,0.22)",
    5: "rgba(244,239,231,0.3)",
    6: "rgba(244,239,231,0.4)",
    7: "rgba(244,239,231,0.55)",
    8: "rgba(244,239,231,0.7)",
    9: "rgba(244,239,231,0.85)",
  },
  transparentLevelsRed: {
    1: "rgba(228,96,46,0.1)",
    2: "rgba(228,96,46,0.2)",
    3: "rgba(228,96,46,0.3)",
    4: "rgba(228,96,46,0.4)",
    5: "rgba(228,96,46,0.5)",
    6: "rgba(228,96,46,0.6)",
    7: "rgba(228,96,46,0.7)",
    8: "rgba(228,96,46,0.8)",
    9: "rgba(228,96,46,0.9)",
  },
};

const lightPalette = {
  mode: "light" as const,
  primary: {
    main: "#1B1712", // warm ink — solid buttons / primary actions
    light: "#3A332B",
    dark: "#000000",
    contrastText: "#F4EFE7",
    dark2: "#241E17",
    light2: "#4A4238",
    light3: "#6F6559",
    lighter: "#9C9284",
    lighter2: "#CFC6B8",
    lighter3: "#E7E0D3",
  },
  secondary: {
    main: "#C2410C", // rust
    light: "#DA5A2A",
    dark: "#9A3009",
    other: "#B45309",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#F4EFE7", // warm paper
    paper: "#FCFAF5", // slightly lighter surface for cards
  },
  divider: "rgba(27,23,18,0.12)",
  text: {
    primary: "#1B1712", // warm near-black ink
    secondary: "#6F6559", // warm taupe
    disabled: "#A99E90",
    main: "#1B1712",
    dark: "#4A4238",
    light: "#000000",
  },
  common: {
    white: "#FFFFFF",
    lite: "#F4EFE7",
  },
  transparentLevels: {
    1: "rgba(252,250,245,0.4)",
    2: "rgba(252,250,245,0.5)",
    3: "rgba(252,250,245,0.6)",
    4: "rgba(252,250,245,0.7)",
    5: "rgba(252,250,245,0.8)",
    6: "rgba(252,250,245,0.9)",
    7: "rgba(252,250,245,0.95)",
    8: "rgba(252,250,245,0.98)",
    9: "rgba(252,250,245,1.0)",
  },
  transparentLevelsWhite: {
    1: "rgba(27,23,18,0.05)",
    2: "rgba(27,23,18,0.09)",
    3: "rgba(27,23,18,0.14)",
    4: "rgba(27,23,18,0.2)",
    5: "rgba(27,23,18,0.3)",
    6: "rgba(27,23,18,0.4)",
    7: "rgba(27,23,18,0.5)",
    8: "rgba(27,23,18,0.6)",
    9: "rgba(27,23,18,0.7)",
  },
  transparentLevelsRed: {
    1: "rgba(194,65,12,0.08)",
    2: "rgba(194,65,12,0.16)",
    3: "rgba(194,65,12,0.24)",
    4: "rgba(194,65,12,0.32)",
    5: "rgba(194,65,12,0.4)",
    6: "rgba(194,65,12,0.5)",
    7: "rgba(194,65,12,0.6)",
    8: "rgba(194,65,12,0.7)",
    9: "rgba(194,65,12,0.8)",
  },
};

const SERIF = "var(--font-serif), Georgia, 'Times New Roman', serif";
const SANS =
  "var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const MONO = "var(--font-mono), 'SFMono-Regular', Menlo, monospace";

export function getTheme(mode: ColorMode): Theme {
  const isDark = mode === "dark";
  return createTheme({
    palette: isDark ? darkPalette : lightPalette,
    typography: {
      fontFamily: SANS,
      // Serif display scale — Fraunces. Tight, high-contrast, editorial.
      h1: {
        fontFamily: SERIF,
        fontSize: "3rem",
        fontWeight: 500,
        lineHeight: 1.04,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: SERIF,
        fontSize: "2.25rem",
        fontWeight: 500,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontFamily: SERIF,
        fontSize: "1.875rem",
        fontWeight: 500,
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        "@media (max-width: 600px)": { fontSize: "1.6rem" },
      },
      h4: {
        fontFamily: SERIF,
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
      },
      h5: {
        fontFamily: SERIF,
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.25,
      },
      h6: {
        fontFamily: SERIF,
        fontSize: "1.05rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      body1: {
        fontSize: "1.0625rem",
        lineHeight: 1.7,
        letterSpacing: "0.003em",
        color: isDark ? "#C9C0B3" : "#4A4238",
      },
      body2: {
        fontSize: "0.9375rem",
        lineHeight: 1.65,
        color: isDark ? "#A79D90" : "#6F6559",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        color: isDark ? "#F4EFE7" : "#1B1712",
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: isDark ? "#C9C0B3" : "#4A4238",
      },
      button: {
        fontFamily: SANS,
        fontWeight: 600,
        letterSpacing: "0.01em",
        textTransform: "none",
      },
      // Editorial utility label — mono, spaced, uppercase.
      overline: {
        fontFamily: MONO,
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        lineHeight: 1.6,
      },
      caption: {
        fontFamily: MONO,
        fontSize: "0.72rem",
        letterSpacing: "0.04em",
        color: isDark ? "#A79D90" : "#6F6559",
      },
    },
    ...commonSettings,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#14110F" : "#F4EFE7",
            scrollbarColor: isDark ? "#39332B #14110F" : "#D8CFBF #F4EFE7",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "transparent",
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: "0px",
              backgroundColor: isDark ? "#39332B" : "#D8CFBF",
              minHeight: "24px",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: isDark ? "#4A4238" : "#C0B6A3",
              },
            "::selection": {
              backgroundColor: isDark
                ? "rgba(228,96,46,0.3)"
                : "rgba(194,65,12,0.18)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "2px",
            boxShadow: "none",
            paddingTop: 10,
            paddingBottom: 10,
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark
              ? "rgba(244,239,231,0.13)"
              : "rgba(27,23,18,0.12)",
          },
        },
      },
    },
  });
}
