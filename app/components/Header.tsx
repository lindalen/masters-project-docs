import { createBox, createText, useTheme } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import ResetButton from "./ResetButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Switch } from "react-native";

const Text = createText<Theme>();
const Box = createBox<Theme>();

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onReset }) => {
  const theme = useTheme();

  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" padding="m" paddingTop="l">
      <Text color="textPrimary" fontSize={24}>
        MediBot
      </Text>
      <Box flexDirection="row" gap="l">
        <Box flexDirection="row" gap="s" alignItems="center">
          {isDarkMode ? (
            <FontAwesome name="moon-o" size={16} color={theme.colors.textPrimary} />
          ) : (
            <FontAwesome name="sun-o" size={16} color={theme.colors.textPrimary} />
          )}
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </Box>
        <ResetButton onReset={onReset} />
      </Box>
    </Box>
  );
};

export default Header;
