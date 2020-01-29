import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { getCustomRepository } from 'typeorm';
import { TYPES } from '../application/constant/types';
import { UserService } from '../domain/entities/user/user.service';

@controller('/users')
export class UserController extends BaseHttpController {

  constructor() {
    super();
  }

  @httpPost('/')
  public async create(@request() req: express.Request, @response() res: express.Response) {

  }
}
