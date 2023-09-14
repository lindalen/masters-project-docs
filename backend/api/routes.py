from flask import request, jsonify
from services import model_service

def set_routes(app):
    @app.route('/api/chat', methods=['POST'])
    def generate():
        data = request.get_json()
        input_text = data.get('input_text')
        response = model_service.generate_response(input_text)
        return jsonify({'response': response})

    @app.route('/api/reset', methods=['POST'])
    def reset():
        model_service.reset_conversation()
        return jsonify({'response': True})
