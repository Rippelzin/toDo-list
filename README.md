# To-Do List

Aplicacao completa (API + Frontend) para gerenciamento de lista de tarefas com autenticacao de usuario.

## Stack

## Stack

| Camada     | Tecnologia                          |
|------------|--------------------------------------|
| Backend    | Python 3.12, FastAPI, Uvicorn        |
| Banco      | SQLite (via SQLAlchemy ORM)          |
| Auth       | JWT + bcrypt                         |
| Frontend   | React + Vite                         |
| HTTP       | Axios                                |
| Roteamento | react-router-dom                     |

## Pre-requisitos

- **Python 3.10+** instalado
- **Node.js 18+** e **npm** instalados

## Como Executar

### 1. Backend

```bash
# Acesse a pasta do backend
cd backend

# Instale as dependencias para o Python
pip install -r requirements.txt

# Inicie o servidor usando o uvicorn
python -m uvicorn app.main:app --reload
```

O backend vai rodar em:**http://localhost:8000**

### 2. Frontend

Em outro terminal:

```bash
# Acesse a pasta do frontend
cd frontend

# instalar as dependencias Node
npm install

# Inicie o servidor do front
npm run dev
```

O frontend vai rodar em **http://localhost:5173**

## Como Usar

1. Acesse **http://localhost:5173**
2. Clique em **"Cadastre-se"** para criar uma conta
3. Faca **login** com as credencias cadastradas
4. Gerencie suas tarefas:
   - **Adicionar**: preencha o formulario e clique em "Adicionar"
   - **Editar**: clique no icone de lapis na tarefa
   - **Concluir**: clique no icone de concluir (status atual-> concluida)
   - **Excluir**: clique no icone X na tarefa
5. Use os **filtros** para visualizar tarefas por status

## Estrutura do Projeto

```
toDo list/
├── backend/
│   ├── app/
│   │   ├── main.py            # App FastAPI + CORS
│   │   ├── database.py        # Configuracao SQLite/SQLAlchemy
│   │   ├── models.py          # Modelos ORM (User, Task)
│   │   ├── schemas.py         # Schemas Pydantic
│   │   ├── auth.py            # Autenticacao JWT
│   │   └── routes/
│   │       ├── auth_routes.py # Registro e login
│   │       └── task_routes.py # CRUD de tarefas
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Roteamento
│   │   ├── api.js             # Cliente HTTP com JWT
│   │   ├── context/           # AuthContext
│   │   ├── pages/             # Login, Register, Tasks
│   │   ├── components/        # TaskForm, TaskList, TaskItem
│   │   └── styles/            # CSS global
│   ├── package.json
│   └── index.html
├── PLANO.md                   # Plano de implementacao
├── FUNCIONALIDADES.md         # Documentacao de funcionalidades
└── README.md                  # Este arquivo
```

## Endpoints da API

| Metodo | Rota              | Descricao                    | Auth |
|--------|-------------------|------------------------------|------|
| POST   | /auth/register    | Cadastrar usuario            | Nao  |
| POST   | /auth/login       | Login (retorna JWT)          | Nao  |
| GET    | /tasks/           | Listar tarefas do usuario    | Sim  |
| POST   | /tasks/           | Criar nova tarefa            | Sim  |
| PUT    | /tasks/{id}       | Atualizar tarefa             | Sim  |
| DELETE | /tasks/{id}       | Excluir tarefa               | Sim  |
