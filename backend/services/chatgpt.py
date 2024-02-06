import os
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain_openai import ChatOpenAI

class ChatGPTService:
    def __init__(self, model="gpt-3.5-turbo"):
        self.client = ChatOpenAI(temperature=0.69, model=model)

    def format_messages(self, messages):
        formatted_messages = []

        for message in messages:
            role = message["role"]

            if role == "user":
                formatted_messages.append(HumanMessage(content=message["content"]))
            elif role == "assistant":
                formatted_messages.append(AIMessage(content=message["content"]))
            elif role == "system":
                formatted_messages.append(SystemMessage(content=message["content"]))
            
        return formatted_messages

    async def query(self, messages):
        formatted_messages = self.format_messages(messages)
        response = self.client.invoke(formatted_messages)
        return response
