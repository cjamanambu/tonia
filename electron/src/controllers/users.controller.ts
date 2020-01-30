import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../application/constant/types';
import { CreateuserUsecase } from '../application/usecase/user/create-user.usecase';

@controller('/users')
export class UserController extends BaseHttpController {

  constructor(@inject(TYPES.CreateuserUsecase) private createuserUsecase: CreateuserUsecase) {
    super();
  }

  @httpPost('/')
  public async create(@request() req: express.Request, @response() res: express.Response) {
    try {
      await this.createuserUsecase.execute(req.body);
      res.sendStatus(201);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
