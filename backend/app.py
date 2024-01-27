from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from api.routes import set_routes
from services import mistral_service
import shared

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

def create_app():
    print("Initializing app with socket-io.")
    set_routes(app, socketio)
    shared.mistral_service = mistral_service.MistralService(socketio)
    return app
