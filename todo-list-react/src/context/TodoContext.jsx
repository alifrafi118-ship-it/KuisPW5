import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CheckCircle2, X } from "lucide-react";
import dummyTodos from "../data/dummyTodos";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message) => {
    setNotification({ message, key: Date.now() });
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const addTodo = (data) => {
    const newTodo = { ...data, id: Date.now() };
    setTodos((prev) => [newTodo, ...prev]);
    notify("Todo berhasil ditambahkan!");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...data, id } : todo)),
    );
    notify("Todo berhasil diperbarui!");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    notify("Todo berhasil dihapus!");
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}

      {notification && (
        <div
          key={notification.key}
          role="alert"
          className="fixed top-5 right-5 z-[100] flex items-center gap-3 rounded-md border border-[#C5A059] bg-[#1E4D2B] px-4 py-3 text-[#F9F7F2] shadow-lg"
        >
          <CheckCircle2 size={20} className="text-[#E5C17B]" />
          <span className="text-sm font-medium tracking-wide">
            {notification.message}
          </span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 rounded p-0.5 text-[#F9F7F2]/80 hover:bg-[#15381F] hover:text-white"
            aria-label="Tutup notifikasi"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos harus digunakan di dalam TodoProvider");
  }
  return context;
}
