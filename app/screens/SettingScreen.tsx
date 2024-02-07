import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import DarkModeToggler from "../components/DarkModeToggler";
import MediBotIcon from "../components/MediBotIcon";

const Box = createBox<Theme>();

interface SettingScreenProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ isDarkMode, toggleDarkMode }) => {
    return (
    <Box flex={1} backgroundColor="bgPrimary">
        <Header>
          <MediBotIcon/>
          <DarkModeToggler isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
        </Header>
    </Box>)
}

export default SettingScreen