import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
});

export default AuthContext;
