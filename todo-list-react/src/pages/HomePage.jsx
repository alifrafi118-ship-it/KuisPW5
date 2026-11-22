import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, Plus } from "lucide-react";
import { useTodos } from "../context/TodoContext";
import TodoModal from "../components/TodoModal";

const statusStyle = {
  "to-do": "border border-[#0A192F]/25 bg-[#E6ECF5] text-[#0A192F]",
  "in progress": "border border-[#C5A059]/40 bg-[#F4ECD8] text-[#7A5915]",
  done: "border border-[#1E4D2B]/30 bg-[#E3EDE6] text-[#1E4D2B]",
};

const priorityStyle = {
  low: "border border-[#0A192F]/25 bg-[#E6ECF5] text-[#0A192F]",
  medium: "border border-[#C5A059]/40 bg-[#F4ECD8] text-[#7A5915]",
  high: "border border-[#1E4D2B]/30 bg-[#E3EDE6] text-[#1E4D2B]",
};

export function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HomePage() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (data) => {
    addTodo(data);
    setIsModalOpen(false);
  };

  const handleDelete = (todo) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus todo "${todo.title}"?`
    );
    if (confirmed) deleteTodo(todo.id);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-6 text-[#0A192F]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between border-b-2 border-[#0A192F] pb-4">
          <h1 className="font-serif text-3xl font-bold tracking-wide text-[#0A192F]">
            Todo List
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-md border border-[#C5A059] bg-[#0A192F] px-4 py-2 text-sm font-medium tracking-wide text-[#F9F7F2] shadow-sm transition hover:bg-[#162C4E]"
          >
            <Plus size={18} className="text-[#E5C17B]" />
            Tambah Todo
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#D4CBB8] bg-[#FCFBF9] shadow-md">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0A192F] text-xs uppercase tracking-wider text-[#F9F7F2]">
              <tr>
                <th className="px-4 py-3.5 font-semibold">Judul</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold">Prioritas</th>
                <th className="px-4 py-3.5 font-semibold">Deadline</th>
                <th className="px-4 py-3.5 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#6E675C]">
                    Belum ada todo. Klik "Tambah Todo" untuk membuat yang baru.
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="border-t border-[#E8E2D5] transition hover:bg-[#F3EFE6]"
                  >
                    <td className="max-w-[240px] px-4 py-3.5">
                      <p className="truncate font-medium text-[#0A192F]" title={todo.title}>
                        {todo.title}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[todo.status]}`}
                      >
                        {todo.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle[todo.priority]}`}
                      >
                        {todo.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#4A453E]">
                      {formatDate(todo.deadline)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          to={`/todo/${todo.id}`}
                          className="rounded p-1 text-[#0A192F] transition hover:bg-[#E6ECF5] hover:text-[#1E4D2B]"
                          aria-label="Lihat detail"
                        >
                          <Eye size={19} />
                        </Link>
                        <button
                          onClick={() => handleDelete(todo)}
                          className="rounded p-1 text-[#722F37] transition hover:bg-[#F5E4E6] hover:text-[#5A232A]"
                          aria-label="Hapus todo"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
}