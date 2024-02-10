import { createBox, createText } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import { Image } from "react-native";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const AppIcon = () => {
    return (
    <Box flexDirection="row" alignItems="center">
        <Image source={require("../assets/cropped-app-icon-no-bg.png")} style={{ width: 36, height: 36, marginRight: 4 }} />
        <Text color="textPrimary" fontSize={20}>
          WellVerse
        </Text>
      </Box>)
}

export default AppIcon;