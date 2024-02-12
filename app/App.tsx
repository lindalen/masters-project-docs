import 'react-native-polyfill-globals/auto'

import React, { useState } from "react";
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import ChatScreen from "./screens/ChatScreen";
import { darkTheme, theme, Theme } from "./theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import SettingScreen from "./screens/SettingScreen";
import { useAppStore } from './state';
import LoginScreen from './screens/LoginScreen';

enum Screen {
  Chat = "chat",
  Settings = "settings",
  Profile = "profile",
}

const screenHeight = Dimensions.get("window").height;
const Box = createBox<Theme>();
const Text = createText<Theme>();

export default function App() {
  const [screen, setScreen] = useState<Screen>(Screen.Chat);
  const loggedIn = useAppStore((state) => state.loggedIn)
  const darkMode = useAppStore((state) => state.darkMode)
  const currentTheme = darkMode ? darkTheme : theme;

  const renderScreen = () => {
    switch (screen) {
      case Screen.Settings:
        return <SettingScreen/>;
      case Screen.Chat:
      default:
        return <ChatScreen/>;
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      {!loggedIn ?
      <LoginScreen/>
      :
        <Box height={screenHeight} flex={1}>
        {renderScreen()}
        <Box height="7.5%" flexDirection="row" backgroundColor="primary" alignItems="center">
          <Box flex={1} height="100%" justifyContent="center" alignItems="center" onTouchEnd={() => setScreen(Screen.Chat)}>
            <FontAwesome name="comments" size={25} color={theme.colors.textLight} />
          </Box>
          <Box flex={1} height="100%" justifyContent="center" alignItems="center">
            <FontAwesome name="user" size={25} color={theme.colors.textLight} />
          </Box>
          <Box flex={1} height="100%" justifyContent="center" alignItems="center" onTouchEnd={() => setScreen(Screen.Settings)}>
            <FontAwesome name="cog" size={25} color={theme.colors.textLight} />
          </Box>
        </Box>
      </Box>}
    </ThemeProvider>
  );
}
