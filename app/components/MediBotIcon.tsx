import { createBox, createText } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import { Image } from "react-native";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const MediBotIcon = () => {
    return (
    <Box flexDirection="row" alignItems="center">
        <Image source={require("../assets/medibot-icon.png")} style={{ width: 36, height: 36, marginRight: 4 }} />
        <Text color="textPrimary" fontSize={24}>
          MediBot
        </Text>
      </Box>)
}

export default MediBotIcon;