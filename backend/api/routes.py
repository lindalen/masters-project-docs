from flask import request, jsonify
from services import model_service, transcribe_service


def set_routes(app):
    @app.route("/api/chat", methods=["POST"])
    def generate():
        print("Received something")
        data = request.get_json()
        input_text = data.get("input_text")
        response = model_service.generate_response(input_text)
        return jsonify({"response": response})

    @app.route("/api/reset", methods=["POST"])
    def reset():
        model_service.reset_conversation()
        return jsonify({"response": True})

    @app.route("/api/transcribe", methods=["POST"])
    def transcribe():
        data_length = request.content_length
        print("Data Length:", data_length, "GB:", data_length / 1024 / 1024)

        audio_bytes = request.get_data()
        if not audio_bytes:
            return jsonify({"response": "Received empty audio data"}), 400

        print("First 10 bytes:", audio_bytes[:10])

        transcription = transcribe_service.transcribe(audio_bytes)

        return jsonify({"response": transcription})
