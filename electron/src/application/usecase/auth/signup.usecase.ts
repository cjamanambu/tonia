import * as bcrypt from 'bcryptjs';

import { injectable, inject } from 'inversify';
import { IUsecase } from '../usecase.interface';
import { TYPES } from '../../constants';
import { IUser, IUserService } from '../../../domain/user';
import { ISignupRequest } from '../../../protocols';

@injectable()
export class SignupUsecase implements IUsecase {
  constructor(
    @inject(TYPES.UserService) private userService: IUserService,
  ) {}

  public async execute(signupRequest: ISignupRequest): Promise<IUser> {
    await this.userService.findByFullname(signupRequest.fullname)
    .then(user => {
      this.userService.registerUser(user.id, bcrypt.hashSync(signupRequest.password, 8));
    })
    .catch(error => {
      throw new Error(error.message);
    });
    return this.userService.findByEmail(signupRequest.email);
  }
}
