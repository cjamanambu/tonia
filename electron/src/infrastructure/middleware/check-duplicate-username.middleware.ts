import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../application/constant/types';
import { LoginService } from '../../domain/entities/login/login.service';

@injectable()
export class CheckDuplicateUsernameMiddleware extends BaseMiddleware {

  constructor( @inject(TYPES.LoginService) private loginService: LoginService ) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.loginService.findByUsername(req.body.username)
    .then(login => {
      if (login) {
        res.status(400).send({ message: 'Failed! Username is already in use!' });
        return;
      } else {
        return next();
      }
    });
  }

}
