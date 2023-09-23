// theme.ts
import { createTheme } from "@shopify/restyle";

export const colors = {
  primary: "#007BFF",
  secondary: "#6C757D",
  textPrimary: "#212529",
  textSecondary: "#FFFFFF",
  cardPrimary: "#343A40",
  cardSecondary: "#F8F9FA",
};

const theme = createTheme({
  colors: {
    bgMain: colors.cardSecondary,
    fgMain: colors.textPrimary,

    cardPrimary: colors.cardPrimary,
    cardSecondary: colors.cardSecondary,
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
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
    bgMain: colors.cardPrimary,
    fgMain: colors.textSecondary,

    cardPrimary: colors.cardSecondary,
    cardSecondary: colors.cardPrimary,
    textPrimary: colors.textSecondary,
    textSecondary: colors.textPrimary,
  },
};

export { theme, darkTheme };
