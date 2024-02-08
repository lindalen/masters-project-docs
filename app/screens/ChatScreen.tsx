import React, { useState } from "react";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { createBox } from "@shopify/restyle";
import { Theme } from "../theme";
import { KeyboardAvoidingView } from "react-native";
import MediBotIcon from "../components/MediBotIcon";
import DarkModeToggler from "../components/DarkModeToggler";
import ResetButton from "../components/ResetButton";
import { useSendMessage } from "../hooks/useSendMessage";
import { useAppStore } from "../state";

const Box = createBox<Theme>();

interface ChatScreenProps {}

const ChatScreen: React.FC<ChatScreenProps> = ({}) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sendMessage = useSendMessage();
  const messages = useAppStore((state) => state.messages);

  const onChatSubmit = async () => {
    if (!input.trim()) return;
    setIsSubmitting(true);

    try {
      await sendMessage(input);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
      setInput("");
    }
  };

  const onReset = () => {
    useAppStore.setState({ messages: [] }); // Reset messages state globally
    setInput("");
  };

  const onUserInput = (text: string) => {
    setInput(text);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ maxHeight: "92.5%", flex: 1 }}>
      <Box flex={1} backgroundColor="bgPrimary">
        <Header>
          <MediBotIcon/>
          <Box flexDirection="row" gap="l">
            <DarkModeToggler/>
            <ResetButton onReset={onReset}/>
          </Box>
        </Header>
        <MessageList messages={messages} />
        <ChatInput onSubmit={onChatSubmit} onUserInput={onUserInput} isSubmitting={isSubmitting} input={input} />
      </Box>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
