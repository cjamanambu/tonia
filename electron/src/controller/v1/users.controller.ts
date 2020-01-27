import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { getCustomRepository } from 'typeorm';
import { TYPES } from '../../application/constant/types';
import { UserService } from '../../domain/entities/user/user.service';
import { UserUsecase } from '../../application/usecase/user.usecase';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserUsecase) private userUsecase: UserUsecase
  ) {
    super();
  }

  @httpPost('/')
  public async create(@request() req: express.Request, @response() res: express.Response) {
    try {
      await this.userUsecase.createUser(req);
      res.sendStatus(201);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
