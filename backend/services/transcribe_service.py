import numpy as np
import whisper
import os

# Load model and processor once
model = whisper.load_model("base")


def transcribe(audio_bytes):
    temp_file_path = "./data/temp_audio.wav"
    with open(temp_file_path, "wb") as temp_audio:
        temp_audio.write(audio_bytes)

    result = model.transcribe(temp_file_path)

    os.remove(temp_file_path)

    return result["text"].strip()
