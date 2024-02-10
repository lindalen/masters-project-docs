// theme.ts
import { createTheme } from "@shopify/restyle";

// $turquoise: #26CCB6ff;
// $honeydew: #E1F7EEff;
// $mint: #01D4A3ff;
// $cerulean: #0A75A5ff;
// $celestial-blue: #0599DBff;
export const colors = {
  primary: "#01d4a3",
  secondary: "#0599db",

  bgLightPrimary: "#f8fafc",
  bgLightSecondary: "#e2e8f0",

  bgDarkPrimary: "#1e293b",
  bgDarkSecondary: "#334155",

  textLight: "#f8fafc",
  textDark: "#020617",
  textDim: "#94a3b8",
};

const theme = createTheme({
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    bgPrimary: colors.bgLightPrimary,
    bgSecondary: colors.bgLightSecondary,
    textPrimary: colors.textDark,
    textSecondary: colors.textLight,
    textLight: colors.textLight,
    textDim: colors.textDim,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    defaults: {},
    primary: {
      fontSize: 16,
      color: "textLight",
    },
    header: {
      fontSize: 24,
      color: "textPrimary",
    },
    body: {
      fontSize: 16,
      color: "textPrimary",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    bgPrimary: colors.bgDarkPrimary,
    bgSecondary: colors.bgDarkSecondary,
    textPrimary: colors.textLight,
    textSecondary: colors.textDark,
  },
};

export { theme, darkTheme };
