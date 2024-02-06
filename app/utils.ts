import { ChatMessage } from "./types";

export const proxyUrl = "http://127.0.0.1:8000";

export function isChatMessage(obj: any): obj is ChatMessage {
    return (
      obj !== null &&
      typeof obj === "object" &&
      typeof obj.role === "string" &&
      typeof obj.content === "string"
    );
  }
  
