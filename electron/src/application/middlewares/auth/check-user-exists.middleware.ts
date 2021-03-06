import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants';
import { IUserService } from '../../../domain/user';

@injectable()
export class CheckUserExistsMiddleware extends BaseMiddleware {

  constructor( @inject(TYPES.UserService) private userService: IUserService ) {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    this.userService.findByFullname(req.body.fullname)
    .then(user => {
      if (user) {
        return next();
      }
    })
    .catch(error => {
      return res.status(400).send({ message: 'Failed! Error finding user with this fullname', error });
    });
  }
}
