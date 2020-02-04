// App
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';

// Login
import { Login } from '../entities';
import { ILogin, ILoginService, LoginInput } from '../../domain/login';

@injectable()
export class LoginService implements ILoginService {

  public async createAndSave(login: LoginInput): Promise<ILogin> {
    return await getRepository(Login).save({
      email: login.email,
      passwordSalt: login.passwordSalt,
      passwordHash: login.passwordHash,
      role: login.role,
      userID: login.userID
    });
  }

  public async findByEmail(email: string): Promise<ILogin> {
    return await getRepository(Login).findOne({
      where: { email }
    });
  }

}
