import { IUser } from '../user';

export interface ILogin {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  user: IUser;
}
