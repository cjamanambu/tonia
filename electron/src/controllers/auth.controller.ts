import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../application/constants';
import { SignupUsecase, LoginUsecase } from '../application/usecase';

@controller('/auth')
export class AuthController extends BaseHttpController {

  constructor(
    @inject(TYPES.SignupUsecase) private signupUsecase: SignupUsecase,
    @inject(TYPES.LoginUsecase) private loginUsecase: LoginUsecase
  ) {
    super();
  }

  @httpPost('/signup', TYPES.CheckUserExistsMiddleware, TYPES.CheckDuplicateEmailMiddleware)
  public async signup(@request() req: express.Request, @response() res: express.Response) {
    try {
      await this.signupUsecase.execute(req.body);
      res.sendStatus(201);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @httpPost('/login')
  public async login(@request() req: express.Request, @response() res: express.Response) {
    try {
      await this.loginUsecase.execute(req.body)
      .then(token => {
        if (token) {
          res.status(200).json({ token });
        } else {
          res.status(400).json({ error: 'Token could not be made for this login attempt'});
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
