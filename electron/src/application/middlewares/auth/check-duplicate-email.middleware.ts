import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants/types';
import { ILoginService } from '../../../domain/login';

@injectable()
export class CheckDuplicateEmailMiddleware extends BaseMiddleware {

  constructor( @inject(TYPES.LoginService) private loginService: ILoginService ) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.loginService.findByEmail(req.body.email)
    .then(login => {
      return res.status(400).send({ message: 'Failed! Found login with the same email!', login });
    })
    .catch(error => {
      return next();
    });
  }

}
