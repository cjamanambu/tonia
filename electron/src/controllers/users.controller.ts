import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../application/constants';
import { CreateuserUsecase } from '../application/usecase';

@controller('/users')
export class UserController extends BaseHttpController {

  constructor(@inject(TYPES.CreateuserUsecase) private createuserUsecase: CreateuserUsecase) {
    super();
  }

  @httpPost('/')
  public async create(@request() req: express.Request, @response() res: express.Response) {
    try {
      await this.createuserUsecase.execute(req.body)
      .then(newUser => {
        if (newUser) {
          res.status(201).json({ newUser });
        } else {
          res.status(400).json({ error: 'Error! The new user could not be created!' });
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
