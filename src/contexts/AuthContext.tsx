import { createContext, PropsWithChildren, useState } from 'react';
import { UserType } from '../dataTypes/UserType';

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
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<AuthContextType['token']>('');

  const login = (user: UserType, token: string) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  const refresh = (user: UserType) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
