import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BoardMember } from "@/graphql/generated/graphql";

type AssigneeSelectorProps = {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  members: BoardMember[];
};

const AssigneeSelector = ({ selectedIds, onChange, members }: AssigneeSelectorProps) => {
  const [open, setOpen] = useState(false);

  const toggle = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((uid) => uid !== id)
      : [...selectedIds, id];
    onChange(updated);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-3 w-full rounded-xl border border-zinc-300 dark:border-zinc-600 
                   bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm 
                   flex items-center justify-between gap-2 focus:outline-none"
      >
        {selectedIds.length > 0 ? `Assigned (${selectedIds.length})` : "Assign Members"}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="absolute z-10 mt-1 bg-white dark:bg-zinc-700 
                        border border-zinc-300 dark:border-zinc-600 rounded-xl 
                        shadow-lg max-h-40 overflow-y-auto w-full"
        >
          {members.map((member) => (
            <label
              key={member.userId}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-zinc-600"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(member.userId)}
                onChange={() => toggle(member.userId)}
                className="accent-blue-600"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-200">
                {member.user.username}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeSelector;
