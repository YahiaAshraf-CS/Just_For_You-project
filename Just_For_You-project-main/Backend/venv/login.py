from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import check_password_hash
import json
import os

app = Flask(__name__)
CORS(app)


USERS_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "users.json")

def load_users():
    """Load users from JSON file or return empty list."""
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as f:
        return json.load(f)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email", "").lower()
    password = data.get("password")

    if not email or not password:
        return jsonify({"status": "error", "message": "Missing email or password"}), 400

    users = load_users()

    
    user = next((u for u in users if u["email"] == email), None)

    if not user:
        return jsonify({"status": "error", "message": "Invalid email or password"}), 401

    
    if not check_password_hash(user["password"], password):
        return jsonify({"status": "error", "message": "Invalid email or password"}), 401

   
    return jsonify({
        "status": "success",
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "firstName": user["firstName"],
            "lastName": user["lastName"],
            "number": user["number"],
            "email": user["email"]
        }
    }), 200


if __name__ == "__main__":
    app.run(debug=True)
