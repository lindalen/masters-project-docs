import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import { GestureResponderEvent, KeyboardAvoidingView } from "react-native";
import { proxyUrl } from "../utils";
import io, { Socket } from "socket.io-client";

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
      const response = await fetch(`${proxyUrl}/api/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...messages, chatMessage]),
      });

      if (!response.ok) throw new RequestError("Request failed");
    } catch (error) {
      if (error instanceof NetworkError) {
        setError("Unable to reach the server. Try again.");
      } else if (error instanceof RequestError) {
        setError("There was a problem with the request. Try again.");
      }
      setIsSubmitting(false);
    }
  };

  const onTokenReceived = (token: string) => {
    setCurrentToken((prev) => prev + token);
    setMessages((prevMessages) => {
      if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1].role !== "assistant") {
        return [...prevMessages, { role: "assistant", content: token }];
      }

      const messagesExceptLast = prevMessages.slice(0, -1);
      const updatedLastMessage = {
        ...prevMessages[prevMessages.length - 1],
        content: prevMessages[prevMessages.length - 1].content + token,
      };

      return [...messagesExceptLast, updatedLastMessage];
    });
  };

  const onUserInput = (text: string) => {
    setInput(text);
  };

  const onReset = () => {
    setInput("");
    setMessages([]);
  };

  useEffect(() => {
    const socketInstance = io(proxyUrl);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("new_token", (data) => {
        if (data.token.includes("[INST]")) {
          setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: "" }]);
          return;
        }
        onTokenReceived(data.token);
      });

      socket.on("generation_end", () => {
        setIsSubmitting(false);
        console.log(currentToken.trim());
      });
    }

    return () => {
      if (socket) {
        socket.off("new_token");
        socket.off("generation_end");
      }
    };
  }, [socket]);

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
