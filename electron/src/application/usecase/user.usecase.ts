
import * as express from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constant/types';
import { UserService } from '../../domain/entities/user/user.service';
import { UserMapper } from '../mapper/user.mapper';
import { IUser } from '../../domain/entities/user/user.interface';

@injectable()
export class UserUsecase {

  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.UserMapper) private userMapper: UserMapper
  ) {}

  public async createUser(req: express.Request): Promise<IUser> {
    // const user = this.userMapper.fromReqBodyToUserInput(req);
    return this.userService.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    });
  }

}
