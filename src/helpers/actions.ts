import { IMessage, ISession } from '../models/session';
import { User } from '../models/user';
import { API_ENDPOINT } from '../utils/constant';

export const userActions = {
  getUserById: async (userId: string) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/users/${userId}.json`);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
  getUsersList: async (userId: string) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/users.json`);
      const data = await res.json();
      const users = [];
      for (const user in data) {
        if (data[user]?.id !== userId) {
          users.push(data[user]);
        }
      }
      return users;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
};

export const chatActions = {
  getChats: async function (user: User) {
    try {
      const res = await fetch(`${API_ENDPOINT}/chat.json`);
      const data = await res.json();
      const chatSessions: ISession[] = [];
      for (const session in data) {
        if (
          data[session]?.user1?.id === user?.id ||
          data[session]?.user2?.id === user?.id
        ) {
          chatSessions?.push({ id: session, ...data[session] });
        }
      }
      return chatSessions;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
  getMessages: async function (sessionId: string) {
    try {
      const res = await fetch(`${API_ENDPOINT}/chat/${sessionId}.json`);
      const data: ISession = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
  createSession: async function (user1: User, user2: User) {
    try {
      const sessionId = `${user1?.id}-${user2?.id}`;
      const body = {
        sessionId,
        user1,
        user2,
        messages: [],
      };
      const existentSessions = await fetch(`${API_ENDPOINT}/chat.json`);
      const data: ISession[] = await existentSessions.json();
      for (const session in data) {
        if (data[session]?.sessionId === `${user1?.id}-${user2?.id}`) {
          throw new Error('A session has already been created with this user');
        }
      }
      const res = await fetch(`${API_ENDPOINT}/chat.json`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error('Error has occurred');
      }
      const sessionData = await res.json();
      const session = await fetch(
        `${API_ENDPOINT}/chat/${sessionData?.name}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            id: sessionData?.name,
            ...body,
          }),
        }
      );
      const _res: ISession = await session.json();
      return _res;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  sendMsg: async function (sessionId: string, user: User, body: IMessage) {
    try {
      const currentSessionData: ISession = (await this.getChats(user)).filter(
        (session) => session?.id === sessionId
      )[0];
      const res = await fetch(`${API_ENDPOINT}/chat/${sessionId}.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...currentSessionData,
          messages: currentSessionData.messages?.length
            ? [...currentSessionData.messages, body]
            : [body],
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
};
