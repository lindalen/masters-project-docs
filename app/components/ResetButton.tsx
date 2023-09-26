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
  const reset = async (event: GestureResponderEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${proxyUrl}/api/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      onReset();
    } catch (error) {
      console.error("Reset Error:", error);
    }
  };

  return (
    <FontAwesome.Button name="rotate-left" onPress={reset} color="white" backgroundColor={theme.colors.primary}>
      Reset
    </FontAwesome.Button>
  );
};

export default ResetButton;
