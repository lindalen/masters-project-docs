import { createBox, useTheme } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Switch } from "react-native";
import { useAppStore } from "../state";

const Box = createBox<Theme>();

interface DarkModeTogglerProps {}

const DarkModeToggler: React.FC<DarkModeTogglerProps> = ({ }) => {
    const theme = useTheme();

    const darkMode = useAppStore((state) => state.darkMode)
    const setDarkMode = useAppStore((state) => state.setDarkMode)

    return (
        <Box flexDirection="row" gap="s" alignItems="center">
          {darkMode ? (
            <FontAwesome name="moon-o" size={24} color={theme.colors.textPrimary} />
          ) : (
            <FontAwesome name="sun-o" size={24} color={theme.colors.textPrimary} />
          )}
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </Box>
    )
}

export default DarkModeToggler;