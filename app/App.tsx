import React, { useState } from "react";
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import ChatScreen from "./screens/ChatScreen";
import { darkTheme, theme, Theme } from "./theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import SettingScreen from "./screens/SettingScreen";

enum Screen {
  Chat = "chat",
  Settings = "settings",
  Profile = "profile",
}

const screenHeight = Dimensions.get("window").height;
const Box = createBox<Theme>();
const Text = createText<Theme>();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screen, setScreen] = useState<Screen>(Screen.Chat);
  const currentTheme = isDarkMode ? darkTheme : theme;

  const renderScreen = () => {
    switch (screen) {
      case Screen.Settings:
        return <SettingScreen isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}/>;
      case Screen.Chat:
      default:
        return <ChatScreen isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Box height={screenHeight} flex={1}>
        {renderScreen()}
        <Box height="7.5%" flexDirection="row" backgroundColor="primary" alignItems="center">
          <Box flex={1} height="100%" justifyContent="center" alignItems="center" onTouchEnd={() => setScreen(Screen.Chat)}>
            <FontAwesome name="comments" size={25} color={theme.colors.textLight} />
            <Text variant="primary">Chat</Text>
          </Box>
          <Box flex={1} height="100%" justifyContent="center" alignItems="center">
            <FontAwesome name="user" size={25} color={theme.colors.textLight} />
            <Text variant="primary">Profile</Text>
          </Box>
          <Box flex={1} height="100%" justifyContent="center" alignItems="center" onTouchEnd={() => setScreen(Screen.Settings)}>
            <FontAwesome name="cog" size={25} color={theme.colors.textLight} />
            <Text variant="primary">Settings</Text>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
