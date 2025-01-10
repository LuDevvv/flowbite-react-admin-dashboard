import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import api from "../lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: { email: string; password: string }) => Promise<void>;
  handleLogOut: () => Promise<void>;
  userData: any;
  loading: boolean;
  updateAuthState: (user: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log({ userData });

  const updateAuthState = async (user: any) => {
    if (user) {
      setUserData(user);
      setIsAuthenticated(true);
    } else {
      setUserData(null);
      setIsAuthenticated(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/auth/check-status");
      if (response.status === 200) {
        await updateAuthState(response.data.user);
      } else {
        await updateAuthState(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      await updateAuthState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", userData);
      if (response.status === 200) {
        await updateAuthState(response.data.user);
      } else {
        await updateAuthState(null);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      await updateAuthState(null);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        handleLogOut,
        userData,
        loading,
        updateAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
