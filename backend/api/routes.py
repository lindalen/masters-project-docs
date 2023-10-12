from flask import request, jsonify
from services import model_service, transcribe_service, mistral_service


def set_routes(app):
    @app.route("/api/chat", methods=["POST"])
    def generate():
        data = request.get_json()
        print(data)
        response = mistral_service.generate_response(data)
        print("Response:", response)
        return jsonify({"response": response})

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
