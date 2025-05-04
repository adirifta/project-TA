from datetime import datetime
from pydantic import BaseModel # type: ignore
from typing import Optional

class AIRequestBase(BaseModel):
    user_id: str
    prompt: str
    model: str = "text-bison@001"
    parameters: Optional[dict] = None

class AIRequestCreate(AIRequestBase):
    pass

class AIRequest(AIRequestBase):
    request_id: str
    response: Optional[str] = None
    created_at: datetime
    status: str = "completed"
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    user_id: str
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }