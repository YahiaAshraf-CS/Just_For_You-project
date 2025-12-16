from flask import Blueprint, request, jsonify     
from models import User,Product 
app = Blueprint('Dashboard', __name__)
