import { injectable } from 'inversify';
import { ILogin } from './login.interface';
import { getRepository } from 'typeorm';
import { Login } from './login.entity';
import { LoginInput } from './login.input';

@injectable()
export class LoginService {

  constructor() {}

  public async createAndSave(login: LoginInput): Promise<ILogin> {
    return await getRepository(Login).save({
      username: login.username,
      passwordSalt: login.passwordSalt,
      passwordHash: login.passwordHash,
      role: login.role,
      userID: login.userID
    });
  }

  public async findByUsername(username: string): Promise<ILogin> {
    return await getRepository(Login).findOne({
      where: { username }
    });
  }

}
