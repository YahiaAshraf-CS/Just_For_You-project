from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

app = Blueprint('signup', __name__)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    firstName = data.get("firstName")
    lastName = data.get("lastName")
    number = data.get("number")
    email = data.get("email").lower()
    password = data.get("password")

    if not all([firstName, lastName, number, email, password]):
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"status": "error", "message": "Email already exists"}), 409
    
    hashed_password = generate_password_hash(password)

    new_user = User(
        firstName=firstName,
        lastName=lastName,
        number=number,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"status": "success", "message": "User registered"}), 201

@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"status": "success", "message": "User deleted"}), 200
