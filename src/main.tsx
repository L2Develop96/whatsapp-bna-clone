import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuthContext from './app/index.ts';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContext.Provider value={{ isAuthenticated: false, user: {} }}>
      <ChakraProvider theme={theme()}>
        <App />
      </ChakraProvider>
    </AuthContext.Provider>
  </React.StrictMode>
);
