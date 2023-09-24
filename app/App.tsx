import React, { useState } from "react";
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import ChatScreen from "./screens/ChatScreen";
import { darkTheme, theme, Theme } from "./theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Box = createBox<Theme>();
const Text = createText<Theme>();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : theme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Box flex={1}>
        <ChatScreen isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        <Box height="7.5%" flexDirection="row" backgroundColor="primary" alignItems="center">
          <Box flex={1} height="100%" justifyContent="center" alignItems="center">
            <FontAwesome name="comments" size={25} color={theme.colors.textLight} />
            <Text variant="primary">Chat</Text>
          </Box>
          <Box flex={1} height="100%" justifyContent="center" alignItems="center">
            <FontAwesome name="user" size={25} color={theme.colors.textLight} />
            <Text variant="primary">Profile</Text>
          </Box>
          <Box flex={1} height="100%" justifyContent="center" alignItems="center">
            <FontAwesome name="cog" size={25} color={theme.colors.textLight} />
            <Text variant="primary">Settings</Text>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
