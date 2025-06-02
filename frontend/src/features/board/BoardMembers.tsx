import {
  UpdateBoardMemberDocument,
  RemoveBoardMemberDocument,
  type BoardRole,
  type BoardMember,
  AddBoardMemberDocument,
  GetBoardDocument,
  type User,
  SearchUsersDocument,
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
  const [newUserRole, setNewUserRole] = useState<BoardRole>("VIEWER");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDeleteUserId, setPendingDeleteUserId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: searchResults } = useQuery(SearchUsersDocument, {
    variables: { query: searchTerm },
    skip: searchTerm.trim().length < 1,
  });

  const handleAdd = async (userId: string) => {
    if (!userId) return;
    await addMember({ variables: { boardId, userId, role: newUserRole } });
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
          <div className="mt-10 pt-6 border-t-2 border-amber-200 dark:border-slate-600">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-[#5c3a0d] dark:text-amber-300" />
              <h3 className="text-xl font-semibold text-[#5c3a0d] dark:text-amber-100">
                Add New Member
              </h3>
            </div>

            {/* Search Input */}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user by username or email"
              className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-slate-700 border-amber-200 dark:border-slate-600 text-[#5c3a0d] dark:text-amber-100 placeholder-zinc-500 dark:placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
            />

            {/* Search Results */}
            {searchResults?.searchUsers.length > 0 && (
              <ul className="mt-2 bg-white dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded-xl shadow-md max-h-48 overflow-y-auto divide-y divide-amber-100 dark:divide-slate-600">
                {searchResults.searchUsers
                  .filter((u: User) => u.id !== user?.id) // Exclude current user
                  .map((user: User) => (
                    <li
                      key={user.id}
                      onClick={() => {
                        setSelectedUser(user);
                        setSearchTerm(user.username);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-slate-600 transition-colors"
                    >
                      <div className="text-sm font-medium text-[#5c3a0d] dark:text-amber-100">
                        {user.username}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.email}
                      </div>
                    </li>
                  ))}
              </ul>
            )}

            {/* Role Select & Add Button */}
            {selectedUser && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5c3a0d] dark:text-amber-200" />
                  <label className="text-sm font-medium text-[#5c3a0d] dark:text-amber-100">
                    Assign Role:
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as BoardRole)}
                    className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-amber-200 dark:border-slate-600 text-[#5c3a0d] dark:text-amber-100 text-sm focus:outline-none"
                  >
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    if (members.some((m: BoardMember) => m.userId === selectedUser.id)) {
                      alert("User is already a member of this board.");
                      return;
                    }
                    handleAdd(selectedUser.id);
                    setSelectedUser(null);
                    setSearchTerm("");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-400 hover:brightness-110 text-white rounded-xl shadow-md text-sm font-semibold transition"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </button>
              </div>
            )}
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
