from venv import logger
from flask import Blueprint, request, jsonify # type: ignore
from app.services.auth_service import AuthService
from app.models.ai_model import UserCreate
from typing import Optional

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400
            
        # Validasi field required
        required_fields = ['email', 'name', 'password']
        if not all(field in data for field in required_fields):
            return jsonify({"error": f"Missing fields: {', '.join(required_fields)}"}), 400

        user_data = UserCreate(
            email=data['email'],
            name=data['name'],
            password=data['password']
        )
        
        user = auth_service.register_user(user_data)
        token = auth_service.create_access_token(user)
        
        return jsonify({
            "message": "User created successfully",
            "user": user.dict(),
            "access_token": token
        }), 201

    except ValueError as e:
        logger.warning(f"Client error: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        return jsonify({
            "error": "Registration failed",
            "details": str(e)
        }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = auth_service.authenticate_user(email, password)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    
    token = auth_service.create_access_token(user)
    
    return jsonify({
        "message": "Login successful",
        "access_token": token,
        "user": user.dict()
    }), 200