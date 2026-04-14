import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../api";

export default function Tasks() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todas");

  async function fetchTasks() {
    try {
      const { data } = await api.get("/tasks/");
      setTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCreate(taskData) {
    const { data } = await api.post("/tasks/", taskData);
    setTasks((prev) => [data, ...prev]);
  }

  async function handleUpdate(id, taskData) {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    setEditingTask(null);
  }

  async function handleDelete(id) {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleToggleStatus(task, newStatus) {
    await handleUpdate(task.id, { status: newStatus });
  }

  const filteredTasks =
    filter === "todas" ? tasks : tasks.filter((t) => t.status === filter);

  const stats = {
    total: tasks.length,
    pendente: tasks.filter((t) => t.status === "pendente").length,
    em_progresso: tasks.filter((t) => t.status === "em_progresso").length,
    concluida: tasks.filter((t) => t.status === "concluida").length,
  };

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <div className="header-left">
          <h1>Minhas Tarefas</h1>
          <span className="user-badge">{user?.email}</span>
        </div>
        <button onClick={logout} className="btn btn-outline">
          Sair
        </button>
      </header>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat stat-pending">
          <span className="stat-number">{stats.pendente}</span>
          <span className="stat-label">Pendentes</span>
        </div>
        <div className="stat stat-progress">
          <span className="stat-number">{stats.em_progresso}</span>
          <span className="stat-label">Em Progresso</span>
        </div>
        <div className="stat stat-done">
          <span className="stat-number">{stats.concluida}</span>
          <span className="stat-label">Concluidas</span>
        </div>
      </div>

      <TaskForm
        onSubmit={editingTask ? (data) => handleUpdate(editingTask.id, data) : handleCreate}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div className="filter-bar">
        {["todas", "pendente", "em_progresso", "concluida"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "todas" ? "Todas" : f === "em_progresso" ? "Em Progresso" : f === "pendente" ? "Pendentes" : "Concluidas"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Carregando tarefas...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}
