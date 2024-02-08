import os
from typing import List, AsyncGenerator
from fastapi import HTTPException
from mistralai.async_client import MistralAsyncClient
from mistralai.models.chat_completion import ChatMessage
from models.StandardChatMessage import StandardChatMessage

class MistralService:
    def __init__(self):
        _api_key = os.getenv("MISTRAL_API_KEY")
        self.client = MistralAsyncClient(api_key=_api_key)

    def format_messages(self, messages: List[StandardChatMessage]) -> List[ChatMessage]:
        return [
            ChatMessage(role=message.role, content=message.content)
            for message in messages
        ]
    
    async def query(self, messages: List[StandardChatMessage]) -> str:
        formatted_messages = self.format_messages(messages)
        response = await self.client.chat(
            model="mistral-tiny",
            messages=formatted_messages,
        )
        if response is None or len(response.choices) == 0:
            raise HTTPException(status_code=500, detail="Invalid response.")
        return response.choices[0].message.content

    async def stream_response(self, messages: List[StandardChatMessage]) -> AsyncGenerator[str, None]:
        formatted_messages = self.format_messages(messages)
        async for chunk in self.client.chat_stream(model="mistral-tiny", messages=formatted_messages):
            if chunk is None or len(chunk.choices) == 0:
                raise HTTPException(status_code=500, detail="Invalid response.")
            yield chunk.choices[0].delta.content

