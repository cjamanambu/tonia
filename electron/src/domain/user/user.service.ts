import { IUserInput } from './user.input';
import { IUser } from './user.interface';

export interface IUserService {
  createAndSave(user: IUserInput): Promise<IUser>;

  findByEmail(email: string): Promise<IUser>;

  findByFullname(fullname: string): Promise<IUser>;

  findByName(firstname: string, lastname: string): Promise<IUser>;

  findByID(id: string): Promise<IUser>;

  registerUser(id: string, passwordHash: string): void;
}
