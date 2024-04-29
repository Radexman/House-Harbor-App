import { Timestamp } from 'firebase/firestore';

export type UserType = {
  email: string;
  username: string;
  timestamp: Timestamp;
};
