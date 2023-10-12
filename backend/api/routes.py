from flask import request, jsonify
from services import model_service, transcribe_service, mistral_service
from api.streamer import TokenStreamer
from threading import Thread
from transformers import AutoTokenizer, TextIteratorStreamer
import shared

# import this
tokenizer = AutoTokenizer.from_pretrained(
    "TheBloke/Mistral-7B-Instruct-v0.1-GPTQ", use_fast=True
)


def set_routes(app, socketio):
    @app.route("/api/chat", methods=["POST"])
    def generate():
        data = request.get_json()
        print(data, type(data))
        response = mistral_service.generate_response(data)
        return jsonify({"response": response})

    @app.route("/api/stream", methods=["POST"])
    def stream():
        data = request.get_json()

        streamer = TextIteratorStreamer(
            tokenizer, timeout=20.0, skip_prompt=True, skip_special_tokens=True
        )

        # Create a new thread to run the stream_response method
        t = Thread(target=shared.mistral_service.stream_response, args=(data, streamer))
        # Start the new thread
        t.start()

        return jsonify({"response": "Generation started"})

    @app.route("/api/reset", methods=["POST"])
    def reset():
        model_service.reset_conversation()
        return jsonify({"response": True})

    @app.route("/api/transcribe", methods=["POST"])
    def transcribe():
        data_length = request.content_length

        audio_bytes = request.get_data()
        if not audio_bytes:
            return jsonify({"response": "Received empty audio data"}), 400

        transcription = transcribe_service.transcribe(audio_bytes)

        return jsonify({"response": transcription})
