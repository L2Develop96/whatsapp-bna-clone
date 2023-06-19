import React, { createContext, useState } from 'react';
import { ISession } from '../models/session';

interface ISessionContext {
  session: ISession;
  setSession: React.Dispatch<React.SetStateAction<ISession>>;
}

export const SessionContext = createContext<ISessionContext>(
  {} as ISessionContext
);

const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState({} as ISession);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
