import { useState } from "react";

const STATUS_CONFIG = {
  pendente: { label: "Pendente", className: "status-pending" },
  em_progresso: { label: "Em Progresso", className: "status-progress" },
  concluida: { label: "Concluida", className: "status-done" },
};

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const statusInfo = STATUS_CONFIG[task.status] || STATUS_CONFIG.pendente;
  const date = new Date(task.data_criacao).toLocaleDateString("pt-BR");
  const [completing, setCompleting] = useState(false);

  const isDone = task.status === "concluida";

  function handleComplete() {
    if (completing) return;
    if (isDone) {
      onToggleStatus({ ...task, status: "concluida" }, "pendente");
      return;
    }
    setCompleting(true);
    setTimeout(() => {
      onToggleStatus(task, "concluida");
      setCompleting(false);
    }, 650);
  }

  return (
    <div
      className={`task-item ${isDone ? "task-done" : ""} ${completing ? "task-completing" : ""}`}
    >
      <div className="task-complete-overlay">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.titulo}</h3>
          <span className={`status-badge ${statusInfo.className}`}>
            {statusInfo.label}
          </span>
        </div>

        {task.descricao && <p className="task-description">{task.descricao}</p>}

        <span className="task-date">Criada em {date}</span>
      </div>

      <div className="task-actions">
        <button
          className={`btn-icon btn-complete ${isDone ? "is-done" : ""}`}
          onClick={handleComplete}
          title={isDone ? "Reabrir tarefa" : "Concluir tarefa"}
          disabled={completing}
        >
          {isDone ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <polyline points="3 4 3 10 9 10" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(task)}
          title="Editar"
          disabled={completing}
        >
          &#x270E;
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(task.id)}
          title="Excluir"
          disabled={completing}
        >
          &#x2716;
        </button>
      </div>
    </div>
  );
}
