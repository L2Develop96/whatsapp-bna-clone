import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index.ts';
import AuthContextProvider from './app/authContext.tsx';
import SessionContextProvider from './app/sessionContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SessionContextProvider>
        <ChakraProvider theme={theme()}>
          <App />
        </ChakraProvider>
      </SessionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
