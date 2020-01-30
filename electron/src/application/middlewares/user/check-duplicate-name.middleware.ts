import * as express from 'express';
import { injectable, inject } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../../constant/types';
import { UserService } from '../../../infrastructure/services/user.service';

@injectable()
export class CheckDublicateName extends BaseMiddleware {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.userService.findByName(req.body.firstname, req.body.lastname)
    .then(user => {
      if (user) {
        res.status(400).send({ message: 'Failed! this user has been added!' });
        return;
      } else {
        return next();
      }
    });
  }
}
