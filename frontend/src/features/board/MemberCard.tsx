import { PencilLine, UserMinus } from "lucide-react";
import type { BoardRole, BoardMember } from "@/graphql/generated/graphql";

type MemberCardProps = {
  member: BoardMember;
  isSelf: boolean;
  canEdit: boolean;
  currentRole: BoardRole;
  onRoleChange: (newRole: BoardRole) => void;
  onUpdate: () => void;
  onDelete: () => void;
};

const MemberCard = ({
  member,
  isSelf,
  canEdit,
  currentRole,
  onRoleChange,
  onUpdate,
  onDelete,
}: MemberCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-slate-700 border-amber-200 dark:border-slate-600">
      <div>
        <p
          className={`text-sm font-medium ${
            isSelf
              ? "text-blue-600 dark:text-blue-300"
              : "text-[#5c3a0d] dark:text-amber-100"
          }`}
        >
          {isSelf ? "You" : `User ID: ${member.userId}`}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Role: {member.role}</p>
      </div>

      {canEdit && (
        <div className="flex items-center gap-2">
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as BoardRole)}
            className="px-2 py-1 rounded-md text-sm bg-white dark:bg-slate-800 border border-amber-300 dark:border-slate-600 text-[#5c3a0d] dark:text-amber-100"
          >
            <option value="VIEWER">Viewer</option>
            <option value="EDITOR">Editor</option>
          </select>

          <button
            onClick={onUpdate}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            aria-label="Update Role"
            title="Update Role"
          >
            <PencilLine className="w-4 h-4" />
          </button>

          <button
            onClick={onDelete}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            aria-label="Remove Member"
            title="Remove Member"
          >
            <UserMinus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
