import { createBox, createText } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import { Switch, TouchableOpacity } from "react-native";
import ResetButton from "./ResetButton";

const Text = createText<Theme>();
const Box = createBox<Theme>();

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onReset }) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" padding="m">
      <Text color="textPrimary" fontSize={24}>
        MediBot
      </Text>
      <Box flexDirection="row" gap="m">
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        <ResetButton onReset={onReset} />
      </Box>
    </Box>
  );
};

export default Header;
