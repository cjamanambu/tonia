import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../constants/types';
import { IUserService } from '../../domain/user';

@injectable()
export class CheckDuplicateEmailMiddleware extends BaseMiddleware {

  constructor(@inject(TYPES.UserService) private userService: IUserService) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.userService.findByEmail(req.body.email)
    .then(user => {
      return res.status(400).send({ message: 'Failed! Found user with the same email!', user });
    })
    .catch(error => {
      return next();
    });
  }

}
