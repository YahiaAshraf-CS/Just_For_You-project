from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash
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


def save_users(users):
    """Save users list to JSON file."""
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    firstName = data.get("firstName")
    lastName = data.get("lastName")
    number = data.get("number")
    email = data.get("email").lower()
    password = data.get("password")

    if not all([firstName, lastName, number, email, password]):
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    users = load_users()

    if any(u["email"] == email for u in users):
        return jsonify({"status": "error", "message": "Email already exists"}), 409
    
    hashed_password = generate_password_hash(password)

    new_user = {
        "id": len(users) + 1,
        "firstName": firstName,
        "lastName": lastName,
        "number": number,
        "email": email,
        "password": hashed_password
    }

    users.append(new_user)
    save_users(users)

    return jsonify({"status": "success", "message": "User registered"}), 201

@app.route("/api/users", methods=["GET"])
def get_users():
    users = load_users()
    return jsonify(users), 200

if __name__ == "__main__":
    app.run(debug=True)
