// App
import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

// Login
import { Login } from '../entities';
import { ILogin, ILoginService, LoginInput } from '../../domain/login';

@injectable()
export class LoginService implements ILoginService {

  public async createAndSave(loginInput: LoginInput): Promise<ILogin> {
    const { email, passwordHash, user } = loginInput;
    const login = new Login();
    login.email = email;
    login.passwordHash = passwordHash;
    login.user = user;
    const errors = await validate(login);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error(`Error! Validation failed for the new user!`);
    }
    return await getRepository(Login).save(login);
  }

  public async findByEmail(email: string): Promise<ILogin> {
    return await getRepository(Login).findOne({
      where: { email }
    });
  }

}
