import { useQuery } from "@apollo/client";
import { GetBoardsDocument } from "@/graphql/generated/graphql";

export const useGetBoards = () => {
  const { data, loading, error, refetch } = useQuery(GetBoardsDocument, {
    fetchPolicy: "network-only",
  });

  // console.log(data);

  return {
    boards: data?.boards || [],
    loading,
    error,
    refetch,
  };
};
