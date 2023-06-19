import { User } from './user';

export interface ISession {
  id: string;
  user1: User;
  user2: User;
  messages: IMessage[];
}

interface IMessage {
  id: string;
  message: string;
  senderId: string;
  date: string;
}
