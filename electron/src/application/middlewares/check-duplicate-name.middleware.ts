import * as express from 'express';
import { injectable, inject } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../constants';
import { IUserService } from '../../domain/user';

@injectable()
export class CheckDublicateName extends BaseMiddleware {

  constructor(@inject(TYPES.UserService) private userService: IUserService) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.userService.findByName(req.body.firstname, req.body.lastname)
    .then(user => {
      if (user) {
        return res.status(400).send({ message: 'Failed! this user has been added!' });
      } else {
        return next();
      }
    });
  }
}
