from typing import Optional
from flask import current_app # type: ignore
from google.cloud import bigquery
from datetime import datetime
import uuid
from app.models.ai_model import AIRequest, AIRequestCreate, User, UserCreate

class BigQueryService:
    def __init__(self):
        self.client = bigquery.Client()
        self.dataset_id = f"{current_app.config['GCP_PROJECT_ID']}.{current_app.config['BIGQUERY_DATASET']}"
        self.users_table_id = f"{self.dataset_id}.{current_app.config['BIGQUERY_USERS_TABLE']}"
        self.requests_table_id = f"{self.dataset_id}.{current_app.config['BIGQUERY_REQUESTS_TABLE']}"
        
        # Initialize tables if they don't exist
        self._initialize_tables()
    
    def _initialize_tables(self):
        from app.utils.bigquery_schema import USERS_SCHEMA, REQUESTS_SCHEMA
        
        # Check and create dataset
        try:
            self.client.get_dataset(self.dataset_id)
        except Exception:
            dataset = bigquery.Dataset(self.dataset_id)
            dataset.location = current_app.config['GCP_LOCATION']
            self.client.create_dataset(dataset, timeout=30)
        
        # Check and create users table
        try:
            self.client.get_table(self.users_table_id)
        except Exception:
            table = bigquery.Table(self.users_table_id, schema=USERS_SCHEMA)
            self.client.create_table(table)
        
        # Check and create requests table
        try:
            self.client.get_table(self.requests_table_id)
        except Exception:
            table = bigquery.Table(self.requests_table_id, schema=REQUESTS_SCHEMA)
            self.client.create_table(table)
    
    def create_user(self, user: UserCreate) -> User:
        user_id = str(uuid.uuid4())
        now = datetime.utcnow()
        
        query = f"""
            INSERT INTO `{self.users_table_id}`
            (user_id, email, name, password_hash, created_at, last_login)
            VALUES (
                @user_id,
                @email,
                @name,
                @password_hash,
                @created_at,
                @created_at
            )
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
                bigquery.ScalarQueryParameter("email", "STRING", user.email),
                bigquery.ScalarQueryParameter("name", "STRING", user.name),
                bigquery.ScalarQueryParameter("password_hash", "STRING", user.password),  # In production, hash this
                bigquery.ScalarQueryParameter("created_at", "TIMESTAMP", now),
            ]
        )
        
        self.client.query(query, job_config=job_config).result()
        
        return User(
            user_id=user_id,
            email=user.email,
            name=user.name,
            created_at=now,
            last_login=now
        )
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        query = f"""
            SELECT user_id, email, name, created_at, last_login
            FROM `{self.users_table_id}`
            WHERE email = @email
            LIMIT 1
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("email", "STRING", email),
            ]
        )
        
        result = self.client.query(query, job_config=job_config).result()
        row = next(result, None)
        
        if row:
            return User(
                user_id=row.user_id,
                email=row.email,
                name=row.name,
                created_at=row.created_at,
                last_login=row.last_login
            )
        return None
    
    def create_ai_request(self, request: AIRequestCreate) -> AIRequest:
        request_id = str(uuid.uuid4())
        now = datetime.utcnow()
        
        query = f"""
            INSERT INTO `{self.requests_table_id}`
            (request_id, user_id, prompt, model, parameters, created_at, status)
            VALUES (
                @request_id,
                @user_id,
                @prompt,
                @model,
                @parameters,
                @created_at,
                @status
            )
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("request_id", "STRING", request_id),
                bigquery.ScalarQueryParameter("user_id", "STRING", request.user_id),
                bigquery.ScalarQueryParameter("prompt", "STRING", request.prompt),
                bigquery.ScalarQueryParameter("model", "STRING", request.model),
                bigquery.ScalarQueryParameter("parameters", "JSON", request.parameters or {}),
                bigquery.ScalarQueryParameter("created_at", "TIMESTAMP", now),
                bigquery.ScalarQueryParameter("status", "STRING", "pending"),
            ]
        )
        
        self.client.query(query, job_config=job_config).result()
        
        return AIRequest(
            request_id=request_id,
            user_id=request.user_id,
            prompt=request.prompt,
            model=request.model,
            parameters=request.parameters,
            created_at=now,
            status="pending"
        )
    
    def update_ai_request(self, request_id: str, response: str, status: str = "completed") -> bool:
        query = f"""
            UPDATE `{self.requests_table_id}`
            SET response = @response,
                status = @status
            WHERE request_id = @request_id
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("response", "STRING", response),
                bigquery.ScalarQueryParameter("status", "STRING", status),
                bigquery.ScalarQueryParameter("request_id", "STRING", request_id),
            ]
        )
        
        result = self.client.query(query, job_config=job_config).result()
        return result.num_dml_affected_rows > 0
    
    def get_user_requests(self, user_id: str, limit: int = 10) -> list[AIRequest]:
        query = f"""
            SELECT request_id, user_id, prompt, response, model, parameters, created_at, status
            FROM `{self.requests_table_id}`
            WHERE user_id = @user_id
            ORDER BY created_at DESC
            LIMIT @limit
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id),
                bigquery.ScalarQueryParameter("limit", "INT64", limit),
            ]
        )
        
        results = self.client.query(query, job_config=job_config).result()
        
        return [
            AIRequest(
                request_id=row.request_id,
                user_id=row.user_id,
                prompt=row.prompt,
                response=row.response,
                model=row.model,
                parameters=dict(row.parameters) if row.parameters else None,
                created_at=row.created_at,
                status=row.status
            )
            for row in results
        ]