import { useGetUserQuery } from "@/graphql/generated/graphql";

export const useGetUser = (userId: string) => {
  const { data, loading, error } = useGetUserQuery({
    variables: { userId },
    skip: !userId,
  });

  return {
    user: data?.getUser ?? null,
    loading,
    error,
  };
};
