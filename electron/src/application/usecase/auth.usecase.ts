import * as express from 'express';
import { injectable, inject } from 'inversify';
import * as bcrypt from 'bcryptjs';
import { TYPES } from '../constant/types';
import { AuthMapper } from '../mapper/auth.mapper';
import { LoginService } from '../../domain/entities/login/login.service';
import { ILogin } from '../../domain/entities/login/login.interface';
import { UserService } from 'src/domain/entities/user/user.service';
import { LoginInput } from 'src/domain/entities/login/login.input';

@injectable()
export class AuthUsecase {
  constructor(
    @inject(TYPES.LoginService) private loginService: LoginService,
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthMapper) private authMapper: AuthMapper,
  ) {}

  public async signup(request: express.Request): Promise<ILogin> {
    const newLogin = this.authMapper.fromRequestToLogin(request);
    newLogin.passwordSalt = bcrypt.genSaltSync(8);
    newLogin.passwordHash = bcrypt.hashSync(request.body.password, newLogin.passwordSalt);
    return this.loginService.createAndSave(newLogin);
  }
}
