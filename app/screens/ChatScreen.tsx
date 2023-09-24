import React, { useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import ChatInput from "../components/InputArea";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import { GestureResponderEvent } from "react-native";
import { proxyUrl } from "../utils";

const Box = createBox<Theme>();

interface ChatScreenProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const onChatSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();

    setMessages((prevMessages) => [...prevMessages, input]);
    setInput("");

    try {
      const response = await fetch(`${proxyUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: input }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.response]);
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages((prevMessages) => [...prevMessages, "Network error. Try again."]);
    }
  };

  const onUserInput = (text: string) => {
    setInput(text);
  };

  const onReset = () => {
    setInput("");
    setMessages([]);
  };

  return (
    <Box flex={1} maxHeight="92.5%" backgroundColor="bgPrimary">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onReset={onReset} />
      <MessageList messages={messages} />
      <ChatInput onSubmit={onChatSubmit} onUserInput={onUserInput} input={input} />
    </Box>
  );
};

export default ChatScreen;
