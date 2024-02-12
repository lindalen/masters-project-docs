from data.apple import decode_apple_user_token
from models.AppleSignInPayload import AppleSignInPayload
from models.StandardChatMessage import StandardChatMessage
from fastapi import APIRouter, UploadFile, File, Body, HTTPException
from fastapi.responses import StreamingResponse
from typing import List
from services.chatgpt import ChatGPTService
from services.mistral import MistralService
from services.transcription import TranscriptionService
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
router = APIRouter()
transcription_service = TranscriptionService()
mistral_service = MistralService()
chat_gpt_3_service = ChatGPTService()
chat_gpt_4_service = ChatGPTService(model="gpt-4")

@router.post("/api/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    transcription = await transcription_service.transcribe(audio_bytes)
    return {"response": transcription}

@router.post("/api/chat")
async def chat_with_model(messages: List[StandardChatMessage], model: str = Body(...)):
    try:
        if model.lower() == "mistral":
            client = mistral_service
        elif model.lower() == "gpt-4":
            client = chat_gpt_4_service
        else:
            client = chat_gpt_3_service

        response = await client.query(messages)

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went bad. Error {e}")

@router.post("/api/stream")
async def stream_chat_with_model(
    messages: List[StandardChatMessage], 
    model: str = Body(...)
):
    # Placeholder for model selection logic
    if model.lower() not in ["mistral", "gpt-3.5", "gpt-4"]:
        raise HTTPException(status_code=400, detail="Unsupported model")

    client = mistral_service

    try:
        async def generate_responses():
            async for response in client.stream_response(messages):
                yield response

        return StreamingResponse(generate_responses(), media_type="text/plain")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error streaming chat responses: {e}")

@router.post("/auth/apple")
async def apple_auth(payload: AppleSignInPayload):
    print("Payload received!")
    print(payload)
    try:
        apple_user = await decode_apple_user_token(payload.identityToken)
        return {"user": repr(apple_user)}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))




    

