import React, { useState } from "react";
import { ThemeProvider } from "@shopify/restyle";
import ChatScreen from "./screens/ChatScreen";
import { darkTheme, theme, Theme } from "./theme";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : theme;

  return (
    <ThemeProvider theme={currentTheme}>
      <ChatScreen
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    </ThemeProvider>
  );
}
