import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UpdateBoardDocument, type Board } from "@/graphql/generated/graphql";
import Button from "@/components/ui/Button";
import { Pencil } from "lucide-react";

type EditBoardFormProps = {
  board: Board;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER";
};

const EditBoardForm = ({ board, currentUserRole }: EditBoardFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(board.title);
  const [editDescription, setEditDescription] = useState(board.description ?? "");

  const [updateBoard] = useMutation(UpdateBoardDocument);

  const handleSave = async () => {
    await updateBoard({
      variables: {
        boardId: board.id,
        title: editTitle,
        description: editDescription,
      },
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div>
            <h2 className="text-3xl font-extrabold text-amber-800 dark:text-amber-100">
              {board.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300">{board.description}</p>
          </div>

          {(currentUserRole === "OWNER" || currentUserRole === "EDITOR") && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
              aria-label="Edit Board"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-2">
      <input
        className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Board title"
      />
      <textarea
        className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Board description"
      />

      <div className="flex gap-2 mt-2">
        <Button variant="primary" size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditBoardForm;
