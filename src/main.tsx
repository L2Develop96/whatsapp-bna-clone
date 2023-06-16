import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/index.ts';
import AuthContextProvider from './app/context.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider theme={theme()}>
        <App />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
