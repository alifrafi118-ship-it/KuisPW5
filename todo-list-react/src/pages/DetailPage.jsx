import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import TodoModal from "../components/TodoModal";
import { formatDate } from "./HomePage";

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

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todo = todos.find((t) => String(t.id) === id);

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F9F7F2]">
        <p className="font-serif text-lg text-[#4A453E]">Todo tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-md bg-[#722F37] px-4 py-2 font-medium text-[#F9F7F2] hover:bg-[#5A232A]"
        >
          Kembali
        </button>
      </div>
    );
  }

  const handleUpdate = (data) => {
    updateTodo(todo.id, data);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F7F2] p-6">
      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-lg border border-[#D4CBB8] border-t-4 border-t-[#0A192F] bg-[#FCFBF9] p-8 shadow-xl md:flex-row md:justify-between">
        <div className="flex-1">
          <h1 className="mb-3 break-words font-serif text-2xl font-bold text-[#0A192F]">
            {todo.title}
          </h1>
          <p className="whitespace-pre-line break-words leading-relaxed text-[#4A453E]">
            {todo.description}
          </p>
        </div>

        <div className="flex w-full flex-col justify-between gap-6 border-t border-[#E8E2D5] pt-4 md:w-64 md:items-end md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6E675C]">
                Status:
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[todo.status]}`}
              >
                {todo.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6E675C]">
                Prioritas:
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle[todo.priority]}`}
              >
                {todo.priority}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6E675C]">
                Deadline:
              </span>
              <span className="text-sm font-medium text-[#0A192F]">
                {formatDate(todo.deadline)}
              </span>
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-md bg-[#722F37] px-4 py-2 text-sm font-medium tracking-wide text-[#F9F7F2] transition hover:bg-[#5A232A]"
            >
              Kembali
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md border border-[#C5A059] bg-[#0A192F] px-4 py-2 text-sm font-medium tracking-wide text-[#F9F7F2] transition hover:bg-[#162C4E]"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={todo}
      />
    </div>
  );
}