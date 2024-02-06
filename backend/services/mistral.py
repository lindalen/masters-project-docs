import os
import asyncio
from queue import Queue
import threading
from typing import List
from models.StandardChatMessage import StandardChatMessage
from fastapi import HTTPException
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

class MistralService:
    def __init__(self):
        _api_key = os.environ.get("MISTRAL_API_KEY")
        self.client = MistralClient(api_key=_api_key)

    def format_messages(self, messages: List[StandardChatMessage]):
        formatted_messages = []

        for message in messages:
            role = message.role

            if role == "user":
                formatted_messages.append(ChatMessage(role="user", content=message.content))
            elif role == "assistant":
                formatted_messages.append(ChatMessage(role="assistant", content=message.content))
            elif role == "system":
                formatted_messages.append(ChatMessage(role="system", content=message.content))
            
        return formatted_messages
    
    def format_response(self, response):
        if response is None or len(response.choices) == 0:
            raise HTTPException(status_code=500, detail="Invalid response.")
        return response.choices[0].message

    async def query(self, messages: List[StandardChatMessage]):
        formatted_messages = self.format_messages(messages)
        response = self.client.chat(
            model="mistral-tiny",
            messages=formatted_messages,
        )
        return self.format_response(response)