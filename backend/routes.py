from fastapi import APIRouter, UploadFile, File, Body, HTTPException
from starlette.responses import StreamingResponse
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
async def chat_with_model(model: str = Body(...), messages: list = Body(...)):
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
        raise HTTPException(status_code=500, detail=str(e))

    

