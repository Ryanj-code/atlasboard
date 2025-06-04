import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ShieldCheck, UserPlus } from "lucide-react";
import {
  type BoardRole,
  type BoardMember,
  type User,
  SearchUsersDocument,
} from "@/graphql/generated/graphql";
import NotificationModal from "@/components/ui/NotificationModal";

type AddBoardMemberProps = {
  currentUserId: string;
  members: BoardMember[];
  onAdd: (userId: string, role: BoardRole) => void;
};

const AddBoardMember = ({ currentUserId, members, onAdd }: AddBoardMemberProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUserRole, setNewUserRole] = useState<BoardRole>("VIEWER");
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const { data: searchResults } = useQuery(SearchUsersDocument, {
    variables: { query: searchTerm },
    skip: searchTerm.trim().length < 1,
  });

  useEffect(() => {
    if (showDuplicateModal) {
      const timeout = setTimeout(() => {
        setShowDuplicateModal(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showDuplicateModal]);

  return (
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
            .filter((u: User) => u.id !== currentUserId)
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

      {/* Role Selection and Add Button */}
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
                setShowDuplicateModal(true);
                return;
              }

              onAdd(selectedUser.id, newUserRole);
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

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showDuplicateModal}
        title="Already a Member"
        message="This user is already a member of the board."
        onClose={() => setShowDuplicateModal(false)}
      />
    </div>
  );
};

export default AddBoardMember;
