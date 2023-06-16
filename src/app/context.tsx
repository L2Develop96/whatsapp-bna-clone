import React, { createContext, useState } from 'react';
import { User } from '../models/user';

interface IAuthContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authenticated: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
