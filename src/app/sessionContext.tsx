import React, { createContext, useState } from 'react';
import { ISession } from '../models/session';

interface ISessionContext {
  session: ISession;
  sessionsList: ISession[];
  setSessionsList: React.Dispatch<React.SetStateAction<ISession[]>>;
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
  const [sessionsList, setSessionsList] = useState<ISession[]>([]);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        setSessionsList,
        sessionsList,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
