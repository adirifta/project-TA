from flask import jsonify # type: ignore
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore
from app.extensions import db
from app.models.user_model import User

def init_dashboard_routes(app):
    @app.route('/api/dashboard', methods=['GET'])
    @jwt_required()
    def get_dashboard_data():
        try:
            current_user_email = get_jwt_identity()
            user = db.session.query(User).filter_by(email=current_user_email).first()
            
            if not user:
                return jsonify({"error": "User not found"}), 404
                
            dashboard_data = {
                "user": {
                    "email": user.email,
                    "name": user.name
                },
                "metrics": {
                    "projects": 15,
                    "api_calls": 1245,
                    "active_users": 342
                }
            }
            
            return jsonify(dashboard_data), 200
            
        except Exception as e:
            return jsonify({"error": str(e)}), 500