import {
  UpdateBoardMemberDocument,
  RemoveBoardMemberDocument,
  type BoardRole,
  type BoardMember,
  AddBoardMemberDocument,
  GetBoardDocument,
  LeaveBoardDocument,
} from "@/graphql/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Users, MinusCircle, ShieldCheck, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmActionModal from "@/components/ui/ConfirmActionModal";
import MemberCard from "./MemberCard";
import { useNavigate } from "react-router-dom";
import AddBoardMember from "./AddBoardMember";

type BoardMembersProp = {
  boardId: string;
  currentUserRole: "OWNER" | "EDITOR" | "VIEWER";
};

const BoardMembers = ({ boardId, currentUserRole }: BoardMembersProp) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, loading, refetch } = useQuery(GetBoardDocument, {
    variables: { boardId },
  });

  const members = data?.getBoard.members ?? [];

  const [addMember] = useMutation(AddBoardMemberDocument);
  const [updateMember] = useMutation(UpdateBoardMemberDocument);
  const [removeMember] = useMutation(RemoveBoardMemberDocument);
  const [leaveBoard] = useMutation(LeaveBoardDocument);

  const [updating, setUpdating] = useState<Record<string, BoardRole>>({});
  const [pendingDeleteUserId, setPendingDeleteUserId] = useState<string | null>(null);
  const [pendingUpdateUserId, setPendingUpdateUserId] = useState<string | null>(null);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleAdd = async (userId: string, role: string) => {
    if (!userId) return;
    await addMember({ variables: { boardId, userId, role } });
    refetch();
  };

  const confirmUpdate = async () => {
    if (!pendingUpdateUserId) return;
    const role = updating[pendingUpdateUserId];
    await updateMember({ variables: { boardId, userId: pendingUpdateUserId, role } });
    setPendingUpdateUserId(null);
    setShowUpdateModal(false);
    refetch();
  };

  const confirmRemove = async () => {
    if (!pendingDeleteUserId) return;
    await removeMember({ variables: { boardId, userId: pendingDeleteUserId } });
    setPendingDeleteUserId(null);
    setShowRemoveModal(false);
    refetch();
  };

  const handleLeaveBoard = async () => {
    await leaveBoard({ variables: { boardId } });
    navigate("/dashboard");
  };

  if (loading || !user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-[#5c3a0d] dark:text-amber-300" />
          <h2 className="text-3xl font-bold text-[#5c3a0d] dark:text-amber-100">
            Board Members
          </h2>
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
                onUpdate={() => {
                  setPendingUpdateUserId(member.userId);
                  setShowUpdateModal(true);
                }}
                onDelete={() => {
                  setPendingDeleteUserId(member.userId);
                  setShowRemoveModal(true);
                }}
              />
            );
          })}
        </div>

        {/* Add New Member */}
        {currentUserRole === "OWNER" && (
          <AddBoardMember currentUserId={user.id} members={members} onAdd={handleAdd} />
        )}

        {/* Leave Board Button */}
        {currentUserRole !== "OWNER" && (
          <div className="mt-10 pt-6 border-t-2 border-amber-200 dark:border-slate-600">
            <button
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow text-sm font-semibold transition"
            >
              <MinusCircle className="w-4 h-4" />
              Leave Board
            </button>
          </div>
        )}

        {/* Confirm Modals */}
        <ConfirmActionModal
          isOpen={showRemoveModal}
          title="Remove Member"
          description="Are you sure you want to remove this member from the board? This action cannot be undone."
          onConfirm={confirmRemove}
          onCancel={() => {
            setShowRemoveModal(false);
            setPendingDeleteUserId(null);
          }}
          icon={<Trash2 className="w-6 h-6 text-red-500 dark:text-red-400" />}
          confirmLabel="Remove"
        />

        <ConfirmActionModal
          isOpen={showLeaveModal}
          title="Leave Board"
          description="Are you sure you want to leave this board? You’ll lose access to its tasks and members."
          onConfirm={handleLeaveBoard}
          onCancel={() => setShowLeaveModal(false)}
          icon={<MinusCircle className="w-6 h-6 text-red-500 dark:text-red-400" />}
          confirmLabel="Leave"
        />

        <ConfirmActionModal
          isOpen={showUpdateModal}
          title="Update Role"
          description="Are you sure you want to change this member's role?"
          onConfirm={confirmUpdate}
          onCancel={() => {
            setShowUpdateModal(false);
            setPendingUpdateUserId(null);
          }}
          icon={<ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-300" />}
          confirmLabel="Update"
        />
      </div>
    </div>
  );
};

export default BoardMembers;
