import { UserInput } from './user.input';
import { IUser } from './user.interface';

export interface IUserService {
  createAndSave(user: UserInput): Promise<IUser>;

  findByName(firstname: string, lastname: string): Promise<IUser>;

  findByID(id: string): Promise<IUser>;

  registerUser(id: string, loginID: string): void;
}
