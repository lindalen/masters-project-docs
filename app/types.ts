export type ChatMessage = {
    role: string;
    content: string;
  };
  
  export class NetworkError extends Error {}
  export class RequestError extends Error {}