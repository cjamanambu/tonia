import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { injectable, inject } from 'inversify';
import { IUsecase } from '../usecase.interface';
import { ILoginRequest } from '../../../protocols';
import { IUserService } from '../../../domain/user';
import { TYPES } from '../../constants';
import { JWT_CONFIG } from '../../config';

@injectable()
export class LoginUsecase implements IUsecase {
  constructor(
    @inject(TYPES.UserService) private userService: IUserService
  ) {}

  public async execute(loginRequest: ILoginRequest): Promise<string> {
    let token = '';
    await this.userService.findByEmail(loginRequest.email)
    .then(user => {
      if (!bcrypt.compareSync(loginRequest.password, user.passwordHash)) {
        throw new Error(`Error! The password is invalid`);
      }
      const PAYLOAD = { user };
      token = jwt.sign(PAYLOAD, JWT_CONFIG.secretKey, JWT_CONFIG.signOptions);
    })
    .catch(error => {
      throw new Error(error.message);
    });
    return token;
  }

}
