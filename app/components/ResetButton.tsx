import { createBox, createText } from "@shopify/restyle";
import React from "react";
import { Theme } from "../theme";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

const Text = createText<Theme>();
const Box = createBox<Theme>();

type ResetButtonProps = {
  onReset: () => void;
};

const ResetButton = ({ onReset }: ResetButtonProps) => {
  const reset = async (event: GestureResponderEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/reset", {
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
    <TouchableOpacity onPress={reset}>
      <Box>
        <Text color="textPrimary">Reset</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default ResetButton;
