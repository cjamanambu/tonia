import * as express from 'express';
import { controller, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor() {
    super();
  }

}
