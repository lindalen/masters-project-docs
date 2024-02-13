import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Model, ChatMessage, Role, User } from "./types";

interface AppState {
    user?: User;
    signIn: (user: User) => void;
    signOut: () => void;
    darkMode: boolean;
    setDarkMode: (b: boolean) => void;
    model: Model;
    setModel: (model: Model) => void;
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    onMessageUpdate: (chunk: string) => void;
  }
  
export const useAppStore = create<AppState>()(
        persist(
            (set) => ({
                signIn: (user) => set({ user: user }),
                signOut: () => set({ user: undefined }),
                darkMode: true,
                setDarkMode: (mode) => set({ darkMode: mode }),
                model: Model.MISTRAL,
                setModel: (model) => set({ model }),
                messages: [],
                addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
                onMessageUpdate: (chunk) => set((state) => {
                const updatedMessages = state.messages.slice();
                if (updatedMessages.length === 0) {
                    updatedMessages.push({ role: Role.AI, content: '' });
                }
                const lastMessageIndex = updatedMessages.length - 1;
                const lastMessage = updatedMessages[lastMessageIndex];
                if (lastMessage.role === Role.AI) {
                    updatedMessages[lastMessageIndex] = { ...lastMessage, content: lastMessage.content + chunk };
                } else {
                    updatedMessages.push({ role: Role.AI, content: chunk });
                }
                return { messages: updatedMessages };
                }),
            }),
            {
                name: "app-storage",
                storage: createJSONStorage(() => AsyncStorage)
            })
);