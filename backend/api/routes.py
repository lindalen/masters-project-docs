from flask import request, jsonify
from services import model_service, transcribe_service, mistral_service
from threading import Thread
import shared


def set_routes(app, socketio):
    @app.route("/api/chat", methods=["POST"])
    def generate():
        data = request.get_json()
        response = mistral_service.generate_response(data)
        return jsonify({"response": response})

    @app.route("/api/stream", methods=["POST"])
    def stream():
        data = request.get_json()

        t = Thread(target=shared.mistral_service.stream_response, args=(data))
        t.start()

        return jsonify({"response": "Generation started"})

    @app.route("/api/reset", methods=["POST"])
    def reset():
        model_service.reset_conversation()
        return jsonify({"response": True})

    @app.route("/api/transcribe", methods=["POST"])
    def transcribe():
        audio_bytes = request.get_data()

        if not audio_bytes:
            return jsonify({"response": "Received empty audio data"}), 400

        transcription = transcribe_service.transcribe(audio_bytes)

        return jsonify({"response": transcription})
