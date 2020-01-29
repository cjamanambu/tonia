import * as express from 'express';
import { controller, BaseHttpController, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../application/constant/types';

@controller('/auth')
export class AuthController extends BaseHttpController {

  constructor() {
    super();
  }

  @httpPost('/signup', TYPES.CheckUserExistsMiddleware, TYPES.CheckDuplicateUsernameMiddleware)
  public async signup(@request() req: express.Request, @response() res: express.Response) {
    console.log(req.body.userID);
    res.send('We hit the /signup route');
  }
}
