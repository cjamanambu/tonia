import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../application/constant/types';
import { UserService } from '../../domain/entities/user/user.service';

@injectable()
export class CheckUserExistsMiddleware extends BaseMiddleware {

  constructor( @inject(TYPES.UserService) private userService: UserService ) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.userService.findByName(req.body.firstname, req.body.lastname)
    .then(user => {
      if (!user) {
        res.status(400).send({ message: 'Failed! User was not found' });
        return;
      } else {
        req.body.userID = user.id;
        return next();
      }
    });
  }

}
