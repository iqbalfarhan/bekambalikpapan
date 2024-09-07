import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { UserType } from '../dataTypes/UserType';
import useAsyncStorage from '../hooks/useAsyncStorage';

type AuthContextType = {
  token: string;
  user: UserType | null;
  login: (user: UserType, token: string) => void;
  logout: () => void;
  refresh: (user: UserType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: '',
  user: null,
  login: () => {},
  logout: () => {},
  refresh: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const userStore = useAsyncStorage('user');
  const tokenStore = useAsyncStorage('token');

  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<AuthContextType['token']>('');

  const loadAuthData = useCallback(async () => {
    const storedUser = await userStore.storedValue;
    const storedToken = await tokenStore.storedValue;

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, [tokenStore.storedValue, userStore.storedValue]);

  useEffect(() => {
    loadAuthData();
  }, [loadAuthData]);

  const login = (user: UserType, token: string) => {
    userStore.storeValue(user).then(() => setUser(user));
    tokenStore.storeValue(token).then(() => setToken(token));
  };

  const logout = () => {
    userStore.removeValue().then(() => setUser(null));
    tokenStore.removeValue().then(() => setToken(''));
  };

  const refresh = (user: UserType) => {
    setUser(user);
    userStore.storeValue(user);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
