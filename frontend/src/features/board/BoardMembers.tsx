import {
  UpdateBoardMemberDocument,
  RemoveBoardMemberDocument,
  type BoardRole,
  type BoardMember,
  AddBoardMemberDocument,
  GetBoardDocument,
} from "@/graphql/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Users, ShieldCheck, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import MemberCard from "./MemberCard";

type BoardMembersProp = {
  boardId: string;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER";
};

const BoardMembers = ({ boardId, currentUserRole }: BoardMembersProp) => {
  const { user } = useAuth();
  const { data, loading, refetch } = useQuery(GetBoardDocument, {
    variables: { boardId },
  });
  const members = data?.getBoard.members ?? [];

  const [addMember] = useMutation(AddBoardMemberDocument);
  const [updateMember] = useMutation(UpdateBoardMemberDocument);
  const [removeMember] = useMutation(RemoveBoardMemberDocument);

  const [updating, setUpdating] = useState<Record<string, BoardRole>>({});
  const [newUserId, setNewUserId] = useState("");
  const [newUserRole, setNewUserRole] = useState<BoardRole>("VIEWER");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDeleteUserId, setPendingDeleteUserId] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!newUserId) return;
    await addMember({ variables: { boardId, userId: newUserId, role: newUserRole } });
    setNewUserId("");
    refetch();
  };

  const handleUpdate = async (userId: string, role: BoardRole) => {
    if (!userId || !role) return;
    await updateMember({ variables: { boardId, userId, role } });
    refetch();
  };

  const confirmRemove = async () => {
    if (!pendingDeleteUserId) return;
    await removeMember({ variables: { boardId, userId: pendingDeleteUserId } });
    setPendingDeleteUserId(null);
    setShowConfirmModal(false);
    refetch();
  };

  if (loading) return <p>Loading members...</p>;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-[#5c3a0d] dark:text-amber-300" />
          <div>
            <h2 className="text-3xl font-bold text-[#5c3a0d] dark:text-amber-100">
              Board Members
            </h2>
          </div>
        </div>

        {/* Member List */}
        <div className="space-y-4">
          {members.map((member: BoardMember) => {
            const isSelf = member.userId === user?.id;
            const canEdit = currentUserRole === "OWNER" && !isSelf;
            const currentRole = updating[member.userId] ?? member.role;

            return (
              <MemberCard
                key={member.userId}
                member={member}
                isSelf={isSelf}
                canEdit={canEdit}
                currentRole={currentRole}
                onRoleChange={(newRole) =>
                  setUpdating((prev) => ({ ...prev, [member.userId]: newRole }))
                }
                onUpdate={() => handleUpdate(member.userId, currentRole)}
                onDelete={() => {
                  setPendingDeleteUserId(member.userId);
                  setShowConfirmModal(true);
                }}
              />
            );
          })}
        </div>

        {/* Add New Member */}
        {currentUserRole === "OWNER" && (
          <div className="mt-8 pt-6 border-t-2 border-amber-200 dark:border-slate-600">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-[#5c3a0d] dark:text-amber-300" />
              <h3 className="text-lg font-semibold text-[#5c3a0d] dark:text-amber-100">
                Add New Member
              </h3>
            </div>

            <input
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              placeholder="Enter user ID"
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-amber-200 dark:border-slate-600 text-[#5c3a0d] dark:text-amber-100 placeholder-zinc-500 dark:placeholder-zinc-400"
            />

            <div className="flex items-center gap-2 mt-3">
              <ShieldCheck className="w-4 h-4 text-[#5c3a0d] dark:text-amber-200" />
              <label className="text-sm text-[#5c3a0d] dark:text-amber-100">Role:</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as BoardRole)}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-amber-200 dark:border-slate-600 text-[#5c3a0d] dark:text-amber-100 text-sm"
              >
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>

            <button
              onClick={handleAdd}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md transition"
            >
              <UserPlus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={showConfirmModal}
          title="Remove Member"
          description="Are you sure you want to remove this member from the board? This action cannot be undone."
          onConfirm={confirmRemove}
          onCancel={() => {
            setShowConfirmModal(false);
            setPendingDeleteUserId(null);
          }}
        />
      </div>
    </div>
  );
};

export default BoardMembers;
