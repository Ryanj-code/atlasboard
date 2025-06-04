import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateBoardDocument } from "@/graphql/generated/graphql";
import { PlusSquare, ScrollText } from "lucide-react";

type CreateBoardFormProps = {
  onCreated: () => void;
};

const CreateBoardForm = ({ onCreated }: CreateBoardFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createBoard, { loading }] = useMutation(CreateBoardDocument);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createBoard({ variables: { title, description } });
    setTitle("");
    setDescription("");
    onCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-700
      border border-amber-200 dark:border-slate-600 rounded-2xl p-6 shadow-lg transition-all max-w-lg mx-auto space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <PlusSquare className="w-6 h-6 text-[#5c3a0d] dark:text-amber-300" />
        <h2 className="text-xl font-semibold text-[#5c3a0d] dark:text-amber-100">
          Create New Board
        </h2>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-[#5c3a0d] dark:text-amber-100 mb-1">
          Board Title
        </label>
        <input
          type="text"
          placeholder="e.g. Sprint Alpha"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-xl border border-amber-300 dark:border-slate-600 bg-white dark:bg-slate-700
          text-[#5c3a0d] dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
        />
      </div>

      {/* Description Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-[#5c3a0d] dark:text-amber-100 mb-1">
          Description
        </label>
        <ScrollText className="absolute left-3 top-10 w-4 h-4 text-amber-400 dark:text-slate-400" />
        <input
          type="text"
          placeholder="Optional: short description or goal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-amber-300 dark:border-slate-600 bg-white dark:bg-slate-700
          text-[#5c3a0d] dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white font-semibold shadow-md hover:brightness-110 disabled:opacity-50 transition-all"
      >
        {loading ? "Creating..." : "Create Board"}
      </button>
    </form>
  );
};

export default CreateBoardForm;
