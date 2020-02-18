import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { injectable, inject } from 'inversify';
import { IUsecase } from '../usecase.interface';
import { ILoginRequest } from '../../../protocols';
import { ILoginService } from '../../../domain/login';
import { TYPES } from '../../constants';
import { JWT_CONFIG } from '../../config';

@injectable()
export class LoginUsecase implements IUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: ILoginService
  ) {}

  public async execute(loginRequest: ILoginRequest): Promise<string> {
    let token = '';
    await this.loginService.findByEmail(loginRequest.email)
    .then(login => {
      if (login) {
        if (!bcrypt.compareSync(loginRequest.password, login.passwordHash)) {
          throw new Error(`Error! The password is invalid`);
        }
        const PAYLOAD = { user: login.user };
        token = jwt.sign(PAYLOAD, JWT_CONFIG.secretKey, JWT_CONFIG.signOptions);
      } else {
        throw new Error(`Error! Did not find login with that email`);
      }
    });
    return token;
  }

}
