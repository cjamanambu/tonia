import { ILogin } from './login.interface';
import { LoginInput } from './login.input';

export interface ILoginService {

  createAndSave(login: LoginInput): Promise<ILogin>;

  findByEmail(email: string): Promise<ILogin>;

}
