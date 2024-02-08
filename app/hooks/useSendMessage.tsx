import { postChatMessage } from "../utils";
import { Role } from "../types";
import { useAppStore } from "../state";

export const useSendMessage = () => {
  const model = useAppStore((state) => state.model);
  const messages = useAppStore((state) => state.messages)
  const addMessage = useAppStore((state) => state.addMessage);

  const sendMessage = async (input) => {
    const chatMessage = { role: Role.User, content: input };
    addMessage(chatMessage);

    try {
      // Attempt to send the chat message
      const response = await postChatMessage([...messages, chatMessage], model);
      addMessage({role: Role.AI, content: response});

      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return sendMessage;
};

