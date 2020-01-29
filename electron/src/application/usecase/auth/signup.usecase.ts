import * as bcrypt from 'bcryptjs';

import { injectable, inject } from 'inversify';
import { TYPES } from '../../constant/types';
import { Mapper } from '../../mapper/mapper';
import { LoginService } from '../../../domain/entities/login/login.service';
import { ILogin } from '../../../domain/entities/login/login.interface';
import { IUsecase } from '../usecase.interface';
import { SignupRequest } from '../../../protocols/request/signup-request.protocol';

@injectable()
export class SignupUsecase implements IUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: LoginService,
    @inject(TYPES.Mapper) private mapper: Mapper,
  ) {}

  public async execute(signupRequest: SignupRequest): Promise<ILogin> {
    const loginInput = this.mapper.toLoginInput(signupRequest);
    loginInput.passwordSalt = bcrypt.genSaltSync(8);
    loginInput.passwordHash = bcrypt.hashSync(signupRequest.password, loginInput.passwordSalt);
    return this.loginService.createAndSave(loginInput);
  }
}
