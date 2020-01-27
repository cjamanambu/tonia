import * as express from 'express';
import { UserInput } from '../../domain/entities/user/user.input';
import { injectable } from 'inversify';

@injectable()
export class UserMapper {

  public fromReqBodyToUserInput(req: express.Request) { }

}
