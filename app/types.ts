export enum Role {
  User = "user",
  AI = "assistant",
  System = "system"
}

export enum Model {
  GPT3 = "gpt-3.5",
  GPT4 = "gpt-4",
  MISTRAL = "mistral",
}

export interface ChatMessage {
  role: Role;
  content: string;
}

export function isChatMessage(obj: any): obj is ChatMessage {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.role === "string" &&
    typeof obj.content === "string"
  );
}

export interface ChatResponse {
  message: string;
}
  
export class NetworkError extends Error {}
export class RequestError extends Error {}