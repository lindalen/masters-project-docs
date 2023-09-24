// theme.ts
import { createTheme } from "@shopify/restyle";

export const colors = {
  primary: "#22c55e",
  secondary: "#ec4899",

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
