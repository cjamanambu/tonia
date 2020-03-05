import * as express from 'express';
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';

@controller('/')
export class HomeController extends BaseHttpController {

  constructor() {
    super();
  }

  @httpGet('/')
  public get() {
    const content = 'You have successfully hit the entry point of this express API';
    const statusCode = 200;
    return this.json(content, statusCode);
  }

}
