from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes.auth_routes import router as auth_router
from app.routes.task_routes import router as task_router

# cria as tabelas no banco de dados com base no models.py
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="To-Do List API",
    description="API para gerenciamento de tarefas com autenticacao JWT",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
)

# CORS para permitir acesso do front
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#registra rotas
app.include_router(auth_router)
app.include_router(task_router)


@app.get("/", tags=["Root"])
def root():
    return {"message": "To-Do List API"}
