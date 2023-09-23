import React from "react";
import { Theme } from "../theme";
import { createBox, createText } from "@shopify/restyle";

const Box = createBox<Theme>();
const Text = createText<Theme>();

interface MessageListProps {
  messages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box flex={0.75}>
      {messages.map((message, index) => {
        const isUserMessage = index % 2 === 0;

        return (
          <Box
            key={index}
            flexDirection="row"
            justifyContent={isUserMessage ? "flex-start" : "flex-end"}
          >
            <Box
              backgroundColor="cardPrimary"
              padding="m"
              margin="m"
              maxWidth="50%"
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
    </Box>
  );
};

export default MessageList;
