import React, { useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import ChatInput from "../components/InputArea";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import { GestureResponderEvent, KeyboardAvoidingView } from "react-native";
import { proxyUrl } from "../utils";

const Box = createBox<Theme>();

interface ChatScreenProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export type ChatMessage = {
  role: string;
  content: string;
};

class NetworkError extends Error {}
class RequestError extends Error {}

const ChatScreen: React.FC<ChatScreenProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChatSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();

    const chatMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
    setInput("");

    try {
      const response = await fetch(`${proxyUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...messages, chatMessage]),
      });

      if (!response.ok) throw new RequestError("Request failed");

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      if (error instanceof NetworkError) {
        setError("Unable to reach the server. Try again.");
      } else if (error instanceof RequestError) {
        setError("There was a problem with the request. Try again.");
      }
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
    <KeyboardAvoidingView behavior="padding" style={{ maxHeight: "92.5%", flex: 1 }}>
      <Box flex={1} backgroundColor="bgPrimary">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onReset={onReset} />
        <MessageList messages={messages} />
        <ChatInput onSubmit={onChatSubmit} onUserInput={onUserInput} input={input} />
      </Box>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
