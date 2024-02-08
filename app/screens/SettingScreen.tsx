import React from "react";
import Header from "../components/Header";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import DarkModeToggler from "../components/DarkModeToggler";
import MediBotIcon from "../components/MediBotIcon";
import ModelSelector from "../components/ModelSelector";

const Box = createBox<Theme>();

interface SettingScreenProps {

}

const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
    return (
    <Box flex={1} backgroundColor="bgPrimary" paddingVertical="l">
        <Header>
          <MediBotIcon/>
          <DarkModeToggler/>
        </Header>
        <Box flex={1} flexDirection="column" alignItems="center">
         <ModelSelector/>
        </Box>
        
    </Box>)
}

export default SettingScreen