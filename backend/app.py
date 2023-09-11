from flask import Flask
from flask_cors import CORS
from api.routes import set_routes

app = Flask(__name__)
set_routes(app)
CORS(app)
