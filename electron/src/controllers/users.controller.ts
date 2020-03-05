import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../application/constants';
import { IUsecase } from '../application/usecase';

@controller('/users')
export class UserController extends BaseHttpController {

  constructor(@inject(TYPES.CreateuserUsecase) private createuserUsecase: IUsecase) {
    super();
  }

  @httpPost('/')
  public async create(@request() req: express.Request, @response() res: express.Response) {
    let content: any;
    let statusCode: number;
    await this.createuserUsecase.execute(req.body)
    .then(user => {
      content = { user };
      statusCode = 201;
    })
    .catch(error => {
      content = { error: error.message };
      statusCode = 400;
    });
    return this.json(content, statusCode);
  }
}
