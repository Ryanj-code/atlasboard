import {
  AddBoardMemberDocument,
  UpdateBoardMemberDocument,
} from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client";
import { useState } from "react";

type BoardMembersProp = {
  boardId: string;
};

const BoardMembers = ({ boardId }: BoardMembersProp) => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<"OWNER" | "EDITOR" | "VIEWER">("VIEWER");

  const [addMember] = useMutation(AddBoardMemberDocument);
  const [updateMember] = useMutation(UpdateBoardMemberDocument);

  const handleAdd = async () => {
    await addMember({ variables: { boardId, userId, role } });
    setUserId("");
  };

  const handleUpdate = async () => {
    await updateMember({ variables: { boardId, userId, role } });
  };

  return (
    <div>
      <h4>Manage Members</h4>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <select value={role} onChange={(e) => setRole(e.target.value as any)}>
        <option value="OWNER">Owner</option>
        <option value="EDITOR">Editor</option>
        <option value="VIEWER">Viewer</option>
      </select>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default BoardMembers;
