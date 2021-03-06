import * as bcrypt from 'bcryptjs';

import { injectable, inject } from 'inversify';
import { IUsecase } from '../usecase.interface';
import { TYPES } from '../../constants';
import { IMapper } from '../../mapper';
import { ILogin, ILoginService } from '../../../domain/login';
import { IUserService } from '../../../domain/user';
import { ISignupRequest } from '../../../protocols';

@injectable()
export class SignupUsecase implements IUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: ILoginService,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.Mapper) private mapper: IMapper,
  ) {}

  public async execute(signupRequest: ISignupRequest): Promise<ILogin> {
    const loginInput = this.mapper.toLoginInput(signupRequest);
    loginInput.passwordHash = bcrypt.hashSync(signupRequest.password, 8);
    await this.userService.findByFullname(loginInput.fullname)
    .then(user => {
      loginInput.user = user;
    })
    .catch(error => {
      throw new Error(error.message);
    });
    return await this.loginService.createAndSave(loginInput);
  }
}
