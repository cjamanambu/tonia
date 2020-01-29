import * as bcrypt from 'bcryptjs';

import { injectable, inject } from 'inversify';
import { TYPES } from '../../constant/types';
import { Mapper } from '../../mapper/mapper';
import { LoginService } from '../../../infrastructure/services/login.service';
import { IUsecase } from '../usecase.interface';
import { SignupRequest } from '../../../protocols/request/signup-request.protocol';
import { UserService } from '../../../infrastructure/services/user.service';

@injectable()
export class SignupUsecase implements IUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: LoginService,
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Mapper) private mapper: Mapper,
  ) {}

  public async execute(signupRequest: SignupRequest) {
    const loginInput = this.mapper.toLoginInput(signupRequest);
    loginInput.passwordSalt = bcrypt.genSaltSync(8);
    loginInput.passwordHash = bcrypt.hashSync(signupRequest.password, loginInput.passwordSalt);
    await this.loginService.createAndSave(loginInput)
    .then(async login => {
      if (login) {
        await this.userService.registerUser(login.userID, login.id);
      } else {
        throw new Error('Error! A new login could not be created for this user');
      }
    })
    .catch(error => console.log(error));
  }
}
