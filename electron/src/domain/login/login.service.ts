import { ILogin } from './login.interface';
import { ILoginInput } from './login.input';

export interface ILoginService {

  createAndSave(login: ILoginInput): Promise<ILogin>;

  findByEmail(email: string): Promise<ILogin>;

}
