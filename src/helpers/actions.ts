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
        console.log(userId);
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
  getChats: async (userId: string) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/chat.json`);
      const data = await res.json();
      const chatSessions = [];
      for (const session in data) {
        if (
          data[session]?.user1Id === userId ||
          data[session]?.user2Id === userId
        ) {
          chatSessions?.push(data[session]);
        }
      }
      return chatSessions;
    } catch (error) {
      throw new Error(`Error has ocurred ${error}`);
    }
  },
  createSession: async (userId1: string, userId2: string) => {
    try {
      const body = {
        id: `${userId1}-${userId2}`,
        userId1,
        userId2,
        messages: [],
      };
      const existentSessions = await fetch(`${API_ENDPOINT}/chat.json`);
      const data = await existentSessions.json();
      for (const session in data) {
        if (data[session]?.id === `${userId1}-${userId2}`) {
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
