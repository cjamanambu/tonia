import * as bcrypt from 'bcryptjs';

import { injectable, inject } from 'inversify';
import { IUsecase } from '../usecase.interface';
import { TYPES } from '../../constants';
import { Mapper } from '../../mapper';
import { LoginService, UserService } from '../../../infrastructure/services';
import { ISignupRequest } from '../../../protocols';

@injectable()
export class SignupUsecase implements IUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: LoginService,
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Mapper) private mapper: Mapper,
  ) {}

  public async execute(signupRequest: ISignupRequest) {
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
