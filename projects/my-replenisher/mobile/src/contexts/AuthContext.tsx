import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import api from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
}

interface RefreshToken {
  id: string;
  expires_in: number;
  adminId: string;
}

interface AuthState {
  token: string;
  user: User;
  refreshToken: RefreshToken;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageDate(): Promise<void> {
      const [token, user, refreshToken] = await AsyncStorage.multiGet([
        "@MyReplenisher:token",
        "@MyReplenisher:user",
        "@MyReplenisher:refreshToken",
      ]);

      if (token[1] && user[1] && refreshToken[1]) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
          refreshToken: JSON.parse(refreshToken[1]),
        });
      }

      setLoading(false);
    }
    loadStorageDate();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    setLoading(true);
    const response = await api.post("/auth/sessions", { email, password });
    const { refreshToken, token, user } = response.data;

    await AsyncStorage.multiSet([
      ["@MyReplenisher:token", token],
      ["@MyReplenisher:user", JSON.stringify(user)],
      ["@MyReplenisher:refreshToken", JSON.stringify(refreshToken)],
    ]);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setData({ refreshToken, token, user });
    setLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      "@MyReplenisher:token",
      "@MyReplenisher:user",
      "@MyReplenisher:refreshToken",
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used ithin a AuthProvideru");
  }

  return context;
}

// eslint-disable-next-line import/no-anonymous-default-export
export { AuthProvider, useAuth };
