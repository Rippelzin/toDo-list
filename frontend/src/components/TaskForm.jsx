import { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("pendente");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitulo(editingTask.titulo);
      setDescricao(editingTask.descricao);
      setStatus(editingTask.status);
    } else {
      setTitulo("");
      setDescricao("");
      setStatus("pendente");
    }
  }, [editingTask]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      await onSubmit({ titulo, descricao, status });
      if (!editingTask) {
        setTitulo("");
        setDescricao("");
        setStatus("pendente");
      }
    } catch (err) {
      setErro(err.response?.data?.detail || "Erro ao salvar tarefa");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Editar Tarefa" : "Nova Tarefa"}</h2>

      {erro && <div className="error-message">{erro}</div>}

      <div className="form-row">
        <div className="form-group flex-grow">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Titulo da tarefa"
            required
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="em_progresso">Em Progresso</option>
            <option value="concluida">Concluida</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descricao (opcional)"
          rows={2}
          maxLength={1000}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? "Salvar" : "Adicionar"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
