import { IUser } from '../../domain/user';

export class LoginInput {
  constructor(
    public fullname: string,
    public email: string,
    public passwordHash: string,
    public user: IUser
  ) {}
}
