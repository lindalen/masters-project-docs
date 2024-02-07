import { createBox, useTheme } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Switch } from "react-native";

const Box = createBox<Theme>();

interface DarkModeTogglerProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }

const DarkModeToggler: React.FC<DarkModeTogglerProps> = ({ isDarkMode, toggleDarkMode  }) => {
    const theme = useTheme();

    return (
        <Box flexDirection="row" gap="s" alignItems="center">
          {isDarkMode ? (
            <FontAwesome name="moon-o" size={24} color={theme.colors.textPrimary} />
          ) : (
            <FontAwesome name="sun-o" size={24} color={theme.colors.textPrimary} />
          )}
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </Box>
    )
}

export default DarkModeToggler;