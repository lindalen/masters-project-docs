import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

api_key = os.environ.get("MISTRAL_API_KEY")

class MistralService:
    def __init__(self):
        self.client = MistralClient(api_key=api_key)

    def format_messages(self, messages):
        formatted_messages = []

        for message in messages:
            role = message["role"]

            if role == "user":
                formatted_messages.append(ChatMessage(role="user", content=message["content"]))
            elif role == "assistant":
                formatted_messages.append(ChatMessage(role="assistant", content=message["content"]))
            elif role == "system":
                formatted_messages.append(ChatMessage(role="system", content=message["content"]))
            
        return formatted_messages

    async def query(self, messages):
        formatted_messages = self.format_messages(messages)
        response = self.client.chat(
            model="mistral-tiny",
            messages=formatted_messages,
        )
        return response
    
#for chunk in client.chat_stream(model=model, messages=messages):
    #print(chunk)