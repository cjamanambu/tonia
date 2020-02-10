import { ILogin } from '../login';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  createdAt: Date;
  login: ILogin;
}
