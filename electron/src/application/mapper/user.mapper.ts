import * as express from 'express';
import { UserInput } from '../../domain/entities/user/user.input';
import { injectable } from 'inversify';

@injectable()
export class UserMapper {

  public fromRequestToUser(req: express.Request): UserInput {
    return new UserInput(
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.type
    );
  }

}
