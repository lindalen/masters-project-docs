import React from "react";
import Header from "../components/Header";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import DarkModeToggler from "../components/DarkModeToggler";
import ModelSelector from "../components/ModelSelector";
import AppIcon from "../components/AppIcon";
import { Button } from "react-native";
import SignOutButton from "../components/SignOutButton";

const Box = createBox<Theme>();

interface SettingScreenProps {

}

const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
    return (
    <Box flex={1} backgroundColor="bgPrimary">
        <Header>
          <AppIcon/>
          <DarkModeToggler/>
        </Header>
        <Box flex={1} flexDirection="column" alignItems="center"  paddingVertical="l">
         <ModelSelector/>
         <SignOutButton/>
        </Box>
        
    </Box>)
}

export default SettingScreen