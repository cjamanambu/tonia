import * as express from 'express';
import { controller, httpGet, BaseHttpController, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

@controller('/')
export class HomeController {

  @httpGet('/')
  public get(@response() res: express.Response) {
    res.send('Does res.send work? I guess it does');
  }

}
