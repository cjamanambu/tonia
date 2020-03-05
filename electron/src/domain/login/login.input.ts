import { IUser } from '../../domain/user';

export interface ILoginInput {
  fullname: string;
  email: string;
  passwordHash: string;
  user: IUser;
}
