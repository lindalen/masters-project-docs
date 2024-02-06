import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import { GestureResponderEvent, KeyboardAvoidingView } from "react-native";
import { isChatMessage, proxyUrl } from "../utils";
import io, { Socket } from "socket.io-client";
import { ChatMessage, NetworkError, RequestError } from "../types";

const Box = createBox<Theme>();

interface ChatScreenProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentToken, setCurrentToken] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChatSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();

    const chatMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
    setInput("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${proxyUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          messages: [...messages, chatMessage]}),
      });
      if (!response.ok) throw new RequestError("Request failed");
      const message = await response.json()

      if (!isChatMessage(message)) throw new RequestError("Wrong format.");

      setMessages((prevMessages) => [...prevMessages, message])
    } catch (error) {
      if (error instanceof NetworkError) {
        setError("Unable to reach the server. Try again.");
      } else if (error instanceof RequestError) {
        setError("There was a problem with the request. Try again.");
      }
      setIsSubmitting(false);
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
        <ChatInput onSubmit={onChatSubmit} onUserInput={onUserInput} isSubmitting={isSubmitting} input={input} />
      </Box>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
