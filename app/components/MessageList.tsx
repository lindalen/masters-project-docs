import React, { useEffect, useRef } from "react";
import { Theme, theme } from "../theme";
import { createBox, createText } from "@shopify/restyle";
import { Keyboard, ScrollView, View } from "react-native";

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface MessageListProps {
  messages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      scrollViewRef.current?.scrollToEnd({ animated: true })
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      scrollViewRef.current?.scrollToEnd({ animated: true })
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Box flex={1}>
      <ScrollView style={{ flex: 1, paddingHorizontal: theme.spacing.m }} ref={scrollViewRef}>
        {messages.map((message, index) => {
          const isUserMessage = index % 2 === 0;

          return (
            <Box key={index} flexDirection="row" justifyContent={isUserMessage ? "flex-start" : "flex-end"}>
              <Box
                backgroundColor={isUserMessage ? "bgSecondary" : "bgSecondary"}
                padding="m"
                marginBottom="m"
                width="50%"
              >
                <Box>
                  <Text variant="body">{isUserMessage ? "You" : "MediBot"}</Text>
                </Box>
                <Box>
                  <Text variant="body">{message}</Text>
                </Box>
              </Box>
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default MessageList;
