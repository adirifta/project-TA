from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from flask_jwt_extended import JWTManager # type: ignore
from app.routes.dashboard_routes import init_dashboard_routes

jwt = JWTManager()
cors = CORS()

def create_app(config_name='default'):
    app = Flask(__name__)
    
    # Load config
    from app.config import config
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    jwt.init_app(app)
    cors.init_app(app)
    
    # Register blueprints (lazy loading)
    with app.app_context():
        from app.routes.ai_routes import ai_bp
        from app.routes.auth_routes import auth_bp
        from app.routes.dashboard_routes import init_dashboard_routes
        
        app.register_blueprint(ai_bp, url_prefix='/api/ai')
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        init_dashboard_routes(app)
    
    return app