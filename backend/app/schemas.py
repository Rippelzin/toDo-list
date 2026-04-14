from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

#baseModel ->classe base que usamos para validação = formrequest php
#request do laravel

# ── Auth ──────────────────────────────────────────────

class UserCreate(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., max_length=255)
    senha: str = Field(..., min_length=6, max_length=128)


class UserLogin(BaseModel):
    email: str
    senha: str


class UserResponse(BaseModel):
    id: int
    nome: str
    email: str

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── Tasks ─────────────────────────────────────────────

class TaskCreate(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: str = Field("", max_length=1000)
    status: str = Field("pendente", pattern="^(pendente|em_progresso|concluida)$")


class TaskUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = Field(None, max_length=1000)
    status: Optional[str] = Field(None, pattern="^(pendente|em_progresso|concluida)$")


class TaskResponse(BaseModel):
    id: int
    titulo: str
    descricao: str
    status: str
    data_criacao: datetime
    user_id: int

    model_config = {"from_attributes": True}
