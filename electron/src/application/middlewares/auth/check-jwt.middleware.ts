import * as express from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class CheckJwtMiddleware extends BaseMiddleware {

  constructor() {
    super();
  }

  public handler(req: express.Request, res: express.Response, next: express.NextFunction) {

  }

}
