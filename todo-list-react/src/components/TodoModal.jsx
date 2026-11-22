import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm(
        initialData
          ? {
              title: initialData.title,
              description: initialData.description,
              status: initialData.status,
              priority: initialData.priority,
              deadline: initialData.deadline,
            }
          : emptyForm
      );
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full rounded-md border border-[#D4CBB8] bg-[#FCFBF9] px-3 py-2 text-sm text-[#0A192F] placeholder-[#8C8375] focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A192F]/60 p-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg border border-[#D4CBB8] bg-[#F9F7F2] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 border-b border-[#E5DEC9] pb-3 font-serif text-xl font-bold tracking-wide text-[#0A192F]">
          {isEdit ? "Update Todo" : "Tambah Todo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2C3E50]">
              Judul
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Masukkan judul"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2C3E50]">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Masukkan deskripsi"
              rows={4}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2C3E50]">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2C3E50]">
                Prioritas
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2C3E50]">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-[#E5DEC9] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-[#722F37] px-4 py-2 text-sm font-medium tracking-wide text-[#F9F7F2] transition hover:bg-[#5A232A]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#0A192F] px-4 py-2 text-sm font-medium tracking-wide text-[#F9F7F2] transition hover:bg-[#162C4E]"
            >
              {isEdit ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}