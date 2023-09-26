from transformers import WhisperProcessor, WhisperForConditionalGeneration
from datasets import load_dataset
import numpy as np
import io
from scipy.io import wavfile
from scipy.signal import resample

# Load model and processor once
processor = WhisperProcessor.from_pretrained("openai/whisper-large")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-large")


def transcribe(audio_bytes):
    # Read the audio file into a NumPy array
    sample_rate, audio_data = wavfile.read(io.BytesIO(audio_bytes))
    print(f"Sample rate: {sample_rate}")
    # Process audio data

    # Resample to 16000 Hz if needed
    print("Fixing sample rate!")
    if sample_rate != 16000:
        audio_data = resample(
            audio_data, int(16000 / sample_rate * audio_data.shape[0])
        )
        sample_rate = 16000

    print("Creating input features!")
    input_features = processor(
        audio_data, sampling_rate=sample_rate, return_tensors="pt"
    ).input_features

    # Generate token IDs
    print("Generating from model!")
    predicted_ids = model.generate(input_features)

    # Decode token IDs to text
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

    return transcription
