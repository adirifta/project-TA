from typing import Optional
from venv import logger
from google.cloud import bigquery
from google.api_core.exceptions import GoogleAPICallError # type: ignore
from app.models.ai_model import UserCreate, User
from app.services.bigquery_service import BigQueryService
from flask_jwt_extended import create_access_token # type: ignore
from datetime import timedelta
from app.models.user_model import User
import logging

class AuthService:
    def __init__(self):
        self.bigquery = BigQueryService()
    
    def register_user(self, user_data: UserCreate) -> User:
        try:
            # Validasi input
            if not all([user_data.email, user_data.name, user_data.password]):
                raise ValueError("All fields are required")
            
            # Check if user exists
            existing_user = self.bigquery.get_user_by_email(user_data.email)
            if existing_user:
                logger.warning(f"Registration attempt with existing email: {user_data.email}")
                raise ValueError("Email already registered")
            
            # Create user
            new_user = self.bigquery.create_user(user_data)
            logger.info(f"New user registered: {new_user.email}")
            return new_user

        except ValueError as ve:
            logger.error(f"Validation error: {str(ve)}")
            raise ve
        except GoogleAPICallError as ge:
            logger.error(f"BigQuery error: {str(ge)}")
            raise Exception("Database operation failed")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}") 
            raise Exception("Registration failed due to server error")
    
    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = self.bigquery.get_user_by_email(email)
        if user:
            return user
        return None
    
    def create_access_token(self, user: User) -> str:
        return create_access_token(
            identity=user.user_id,
            additional_claims={
                "email": user.email,
                "name": user.name
            },
            expires_delta=timedelta(days=1)
        )
    
    @staticmethod
    def get_current_user():
        from flask_jwt_extended import get_jwt_identity # type: ignore
        current_user_email = get_jwt_identity()
        return db.session.query(User).filter_by(email=current_user_email).first() # type: ignore