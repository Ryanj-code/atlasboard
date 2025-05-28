import {
  useState,
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useMutation } from "@apollo/client";
import {
  LoginDocument,
  SignupDocument,
  LogoutDocument,
  type User,
  RefreshTokenDocument,
} from "@/graphql/generated/graphql";
import { setAccessToken as setTokenStore } from "@/lib/accessToken";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [loginMutation] = useMutation(LoginDocument);
  const [signupMutation] = useMutation(SignupDocument);
  const [logoutMutation] = useMutation(LogoutDocument);
  const [refreshTokenMutation] = useMutation(RefreshTokenDocument);

  // Optional: auto-refresh on mount
  useEffect(() => {
    const refresh = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      try {
        const { data } = await refreshTokenMutation({
          variables: { token: refreshToken },
        });
        if (data?.refreshToken?.accessToken) {
          setAccessToken(data.refreshToken.accessToken);
          setTokenStore(data.refreshToken.accessToken);
          // optional: fetch user info if needed
        }
      } catch (err) {
        console.error("Token refresh failed", err);
        logout();
      }
    };

    refresh();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await loginMutation({ variables: { email, password } });
    if (data?.login) {
      setUser(data.login.user);
      setAccessToken(data.login.accessToken);
      setTokenStore(data.login.accessToken);
      localStorage.setItem("refreshToken", data.login.refreshToken);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    const { data } = await signupMutation({
      variables: { email, username, password },
    });
    if (data?.signup) {
      setUser(data.signup.user);
      setAccessToken(data.signup.accessToken);
      setTokenStore(data.signup.accessToken);
      localStorage.setItem("refreshToken", data.signup.refreshToken);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await logoutMutation({ variables: { token: refreshToken } });
      } catch (err) {
        console.warn("Logout failed silently", err);
      }
    }
    setUser(null);
    setAccessToken(null);
    setTokenStore(null);
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
