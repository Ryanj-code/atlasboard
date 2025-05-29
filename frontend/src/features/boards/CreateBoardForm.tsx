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
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 
        border-2 border-amber-200 dark:border-slate-600 rounded-xl p-5 
        shadow-lg hover:shadow-xl transition-all duration-300 max-w-md mx-auto space-y-4"
    >
      <div className="flex items-center gap-2 mb-1">
        <PlusSquare className="w-5 h-5 text-[#5c3a0d] dark:text-amber-300" />
        <h3 className="text-lg font-semibold text-[#5c3a0d] dark:text-amber-200">
          Create New Project Board
        </h3>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Board Title (e.g., Sprint Alpha)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded border border-amber-300 dark:border-slate-600 
            bg-white dark:bg-slate-700 text-[#5c3a0d] dark:text-white 
            placeholder:text-amber-400 dark:placeholder:text-slate-400"
        />

        <div className="relative">
          <ScrollText className="absolute left-2 top-2.5 w-4 h-4 text-amber-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Short description or goal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pl-8 p-2 rounded border border-amber-300 dark:border-slate-600 
              bg-white dark:bg-slate-700 text-[#5c3a0d] dark:text-white 
              placeholder:text-amber-400 dark:placeholder:text-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-600 to-cyan-500 text-white py-2 rounded shadow 
          hover:brightness-110 disabled:opacity-50 transition-all"
      >
        {loading ? "Creating..." : "Create Board"}
      </button>
    </form>
  );
};

export default CreateBoardForm;
