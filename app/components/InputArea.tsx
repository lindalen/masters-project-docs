import React, { useState } from "react";
import { Theme } from "../theme";
import { createBox, createText } from "@shopify/restyle";
import {
  GestureResponderEvent,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface InputAreaProps {
  onUserInput: (input: string) => void;
  onSubmit: (event: GestureResponderEvent) => void;
  input: string;
}

const InputArea: React.FC<InputAreaProps> = ({
  onUserInput,
  onSubmit,
  input,
}) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <TextInput
        style={{ flex: 1, height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={onUserInput}
        value={input}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Box padding="m">
          <Text variant="body">Submit</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default InputArea;
