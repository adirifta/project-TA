from flask import Blueprint, request, jsonify # type: ignore
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore
from app.services.google_ai_service import GoogleAIService
from app.models.ai_model import AIRequestCreate

ai_bp = Blueprint('ai', __name__)
ai_service = GoogleAIService()

@ai_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt')
    model = data.get('model', 'text-bison@001')
    parameters = data.get('parameters')
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    
    current_user_id = get_jwt_identity()
    
    result = ai_service.generate_text(
        user_id=current_user_id,
        prompt=prompt,
        model=model,
        parameters=parameters
    )
    
    if result['success']:
        return jsonify({
            "request_id": result['request_id'],
            "response": result['response']
        }), 200
    else:
        return jsonify({
            "error": result['error']
        }), 500

@ai_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    current_user_id = get_jwt_identity()
    limit = request.args.get('limit', default=10, type=int)
    
    requests = ai_service.bigquery.get_user_requests(
        user_id=current_user_id,
        limit=limit
    )
    
    return jsonify([request.dict() for request in requests]), 200