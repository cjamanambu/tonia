import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { createConnection, Connection, getConnectionOptions } from 'typeorm';
import { AddressInfo } from 'net';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import './controller/v1/home.controller';
import './controller/v1/users.controller';


export default class App {

  public server: InversifyExpressServer;
  public app: express.Application;
  private connection: Connection;
  private container: Container;

  constructor() {
    this.container = new Container();
    this.server = new InversifyExpressServer(this.container, null, { rootPath: '/api/v1'});
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
    const server = this.app.listen(5000, () => {
      const { port } = server.address() as AddressInfo;
      console.log('App is listening at %s', port);
    });
  }

  public async closeDBConnection(): Promise<void> {
    await this.connection.close();
  }
}
