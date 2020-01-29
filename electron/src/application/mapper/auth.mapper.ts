import * as express from 'express';
import { LoginInput } from '../../domain/entities/login/login.input';
import { injectable, inject } from 'inversify';
import { TYPES } from '../constant/types';
import { UserService } from '../../domain/entities/user/user.service';

@injectable()
export class AuthMapper {

  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  public fromRequestToLogin(req: express.Request): LoginInput {
    return new LoginInput(req.body.username, null, null, req.body.role, req.body.userID);
  }
}
