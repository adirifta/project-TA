import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
    
    # Google Cloud Config
    GOOGLE_APPLICATION_CREDENTIALS = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
    GCP_PROJECT_ID = os.getenv('GCP_PROJECT_ID')
    GCP_LOCATION = os.getenv('GCP_LOCATION', 'US')
    
    # BigQuery Config
    BIGQUERY_DATASET = os.getenv('BIGQUERY_DATASET', 'ai_platform')
    BIGQUERY_USERS_TABLE = os.getenv('BIGQUERY_USERS_TABLE', 'users')
    BIGQUERY_REQUESTS_TABLE = os.getenv('BIGQUERY_REQUESTS_TABLE', 'ai_requests')
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}   