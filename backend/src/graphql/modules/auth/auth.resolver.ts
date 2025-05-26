import { signup, login, refreshToken, logout } from "./auth.service";

export const authResolvers = {
  Mutation: {
    signup,
    login,
    logout,
    refreshToken,
  },
};
