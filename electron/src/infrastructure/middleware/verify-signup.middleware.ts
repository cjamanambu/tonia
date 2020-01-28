import * as express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable } from 'inversify';

@injectable()
class VerifySignupMiddleware extends BaseMiddleware {
  public handler(req: express.Request, res: express.Response, next: express.NextFunction): void {

  }

  private checkDuplicateUsername(req: express.Request, res: express.Response, next: express.NextFunction): void {
    
  }
}
