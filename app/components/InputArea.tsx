import React, { useState } from "react";
import { Theme, theme } from "../theme";
import { createBox, createText, useTheme } from "@shopify/restyle";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface ChatInputProps {
  onUserInput: (input: string) => void;
  onSubmit: (event: GestureResponderEvent) => void;
  input: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onUserInput, onSubmit, input }) => {
  const theme = useTheme();

  const onSubmitEditing = (event: any) => {
    onSubmit(event);
  };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="m"
      paddingVertical="l"
      gap="s"
      width="100%"
      backgroundColor="bgSecondary"
    >
      <TextInput
        style={{
          flex: 1,
          height: 40,
          borderRadius: theme.spacing.s,
          paddingHorizontal: theme.spacing.s,
          backgroundColor: theme.colors.bgPrimary,
          color: theme.colors.textPrimary,
        }}
        placeholderTextColor={theme.colors.textDim}
        onChangeText={onUserInput}
        value={input}
        placeholder="Send a message..."
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity onPress={onSubmitEditing}>
        <Box
          padding="s"
          justifyContent="center"
          alignItems="center"
          backgroundColor="primary"
          style={{
            borderRadius: theme.spacing.s,
            height: 40,
          }}
        >
          <FontAwesome name="arrow-right" size={20} color={theme.colors.textLight} />
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default ChatInput;
