// App
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';

// entity
import { Login } from '../entities/login.entity';

// domain
import { ILogin } from '../../domain/login/login.interface';
import { ILoginService } from '../../domain/login/login.service';
import { LoginInput } from '../../domain/login/login.input';


@injectable()
export class LoginService implements ILoginService {

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
