import * as express from 'express';
import { controller, BaseHttpController, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserUsecase } from '../../application/usecases/user.usecase';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { getCustomRepository } from 'typeorm';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpPost('/')
  public async post() {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.create();
    user.firstName = 'Test';
    user.lastName = 'User';
    user.email = 'testuser@gmail.com';
    user.phone = '09096000024';
    user.username = 'test';
    user.passwordHash = 'hash';
    await userRepository.save(user);
  }
}
