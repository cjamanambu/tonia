import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { injectable, inject } from 'inversify';
import { IUsecase } from '../usecase.interface';
import { ILoginRequest } from '../../../protocols';
import { TYPES } from '../../constants';
import { LoginService } from '../../../infrastructure/services';
import { jwtConfig } from '../../config';

@injectable()
export class LoginUsecase implements IUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: LoginService
  ) {}

  public async execute(loginRequest: ILoginRequest): Promise<string> {
    let token = '';
    await this.loginService.findByEmail(loginRequest.email)
    .then(login => {
      if (login) {
        if (!bcrypt.compareSync(loginRequest.password, login.passwordHash)) {
          throw new Error('Error! The password is invalid');
        }
        const payload = {
          loginID: login.id,
          userID: login.userID,
          role: login.role
        };
        token = jwt.sign(payload, jwtConfig.secretKey, jwtConfig.signOptions);
      } else {
        throw new Error('Error! Did not find user with that email');
      }
    });
    return token;
  }

}
