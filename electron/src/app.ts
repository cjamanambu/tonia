import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { createConnection, Connection, getConnectionOptions } from 'typeorm';
import { AddressInfo } from 'net';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import './controller/v1/home.controller';
import './controller/v1/users.controller';
import './controller/v1/auth.controller';

import { UserService } from './domain/entities/user/user.service';
import { TYPES } from './application/constant/types';
import { UserMapper } from './application/mapper/user.mapper';
import { UserUsecase } from './application/usecase/user.usecase';
import { LoginService } from './domain/entities/login/login.service';
import { AuthMapper } from './application/mapper/auth.mapper';
import { CheckUserExistsMiddleware } from './infrastructure/middleware/check-user-exists.middleware';
import { CheckDuplicateUsernameMiddleware } from './infrastructure/middleware/check-duplicate-username.middleware';


export default class App {

  public server: InversifyExpressServer;
  public app: express.Application;
  private connection: Connection;
  private container: Container;

  constructor() {
    this.container = new Container();
    this.initializeBindings();
    this.server = new InversifyExpressServer(this.container, null, { rootPath: '/api/v1'});
    this.initializeInfrastructure();
    this.initializeMiddlewares();
    this.app = this.server.build();
  }

  private initializeBindings(): void {
    // user
    this.container.bind<UserService>(TYPES.UserService).to(UserService);
    this.container.bind<UserMapper>(TYPES.UserMapper).to(UserMapper);
    this.container.bind<UserUsecase>(TYPES.UserUsecase).to(UserUsecase);

    // auth
    this.container.bind<AuthMapper>(TYPES.AuthMapper).to(AuthMapper);

    // login
    this.container.bind<LoginService>(TYPES.LoginService).to(LoginService);

    // middleware
    this.container.bind<CheckUserExistsMiddleware>(TYPES.CheckUserExistsMiddleware).to(CheckUserExistsMiddleware);
    this.container.bind<CheckDuplicateUsernameMiddleware>(TYPES.CheckDuplicateUsernameMiddleware).to(CheckDuplicateUsernameMiddleware);
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
