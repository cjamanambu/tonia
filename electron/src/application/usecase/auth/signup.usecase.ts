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
    loginInput.passwordHash = bcrypt.hashSync(signupRequest.password, 8);
    await this.userService.findByFullname(loginInput.fullname)
    .then(user => loginInput.user = user)
    .catch(error => console.log(error));
    await this.loginService.createAndSave(loginInput);
  }
}
