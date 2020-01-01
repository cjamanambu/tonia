import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { createConnection, Connection, getConnectionOptions } from 'typeorm';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import './controllers/v1/users.controller';

export default class App {

  public server: InversifyExpressServer;
  public app: express.Application;
  private connection: Connection;
  private container: Container;

  constructor() {
    this.container = new Container();
    this.server = new InversifyExpressServer(this.container);
    this.initializeInfrastructure();
    this.initializeMiddlewares();
    this.app = this.server.build();
  }

  private initializeBindings(): void {

  }

  private async initializeInfrastructure(): Promise<void> {
    const connectionOptions = await getConnectionOptions();
    this.connection = await createConnection(connectionOptions);
  }

  private initializeMiddlewares(): void {
    this.server.setConfig((app: express.Application) => {
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(bodyParser.json());
      app.use(cors());
    });
  }

  public listen(): void {
    const serve = this.app.listen(process.env.PORT || 5000, () => `App is running on ${serve.address().PORT}`);
  }

  public async closeDBConnection(): Promise<void> {
    await this.connection.close();
  }
}
