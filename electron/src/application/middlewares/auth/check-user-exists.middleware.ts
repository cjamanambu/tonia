import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants';
import { UserService } from '../../../infrastructure/services';

@injectable()
export class CheckUserExistsMiddleware extends BaseMiddleware {

  constructor( @inject(TYPES.UserService) private userService: UserService ) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.userService.findByName(req.body.firstname, req.body.lastname)
    .then(user => {
      if (!user) {
        return res.status(400).send({ message: 'Failed! User was not found' });
      } else {
        req.body.userID = user.id;
        return next();
      }
    });
  }

}
