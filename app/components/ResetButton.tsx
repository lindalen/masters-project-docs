import { createBox, createText } from "@shopify/restyle";
import React, { useEffect } from "react";
import { Theme, theme } from "../theme";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { proxyUrl } from "../utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Text = createText<Theme>();
const Box = createBox<Theme>();

type ResetButtonProps = {
  onReset: () => void;
};

const ResetButton = ({ onReset }: ResetButtonProps) => {
  return (
    <FontAwesome.Button name="rotate-left" onPress={onReset} color="white" backgroundColor={theme.colors.primary}>
      Reset
    </FontAwesome.Button>
  );
};

export default ResetButton;
