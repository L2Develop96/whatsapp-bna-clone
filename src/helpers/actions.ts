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
  getChats: async (user: User) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/chat.json`);
      const data = await res.json();
      const chatSessions = [];
      for (const session in data) {
        if (
          data[session]?.user1?.id === user?.id ||
          data[session]?.user2?.id === user?.id
        ) {
          chatSessions?.push(data[session]);
        }
      }
      return chatSessions;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
  createSession: async (user1: User, user2: User) => {
    try {
      const body = {
        id: `${user1?.id}-${user2?.id}`,
        user1,
        user2,
        messages: [],
      };
      const existentSessions = await fetch(`${API_ENDPOINT}/chat.json`);
      const data = await existentSessions.json();
      for (const session in data) {
        if (data[session]?.id === `${user1?.id}-${user2?.id}`) {
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
      return true;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
};
