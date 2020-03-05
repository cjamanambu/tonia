import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../application/constants';
import { IUsecase } from '../application/usecase';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(TYPES.SignupUsecase) private signupUsecase: IUsecase,
    @inject(TYPES.LoginUsecase) private loginUsecase: IUsecase
  ) {
    super();
  }

  @httpPost('/signup', TYPES.CheckUserExistsMiddleware)
  public async signup(@request() req: express.Request) {
    let content: any;
    let statusCode: number;
    await this.signupUsecase.execute(req.body)
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

  @httpPost('/login')
  public async login(@request() req: express.Request) {
    let content: any;
    let statusCode: number;
    await this.loginUsecase.execute(req.body)
    .then(token => {
      content = { token };
      statusCode = 200;
    })
    .catch(error => {
      content = { error: error.message };
      statusCode = 401;
    });
    return this.json(content, statusCode);
  }
}
