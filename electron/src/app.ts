// App
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { createConnection, Connection, getConnectionOptions } from 'typeorm';
import { AddressInfo } from 'net';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

// controllers
// import './controllers/home.controller';
// import './controllers/users.controller';
// import './controllers/auth.controller';
import './controllers';

// infrastructure services
import { UserService, LoginService } from './infrastructure/services';

// application
import { CheckUserExistsMiddleware, CheckDuplicateEmailMiddleware } from './application/middlewares';
import { SignupUsecase, CreateuserUsecase, LoginUsecase } from './application/usecase';
import { TYPES } from './application/constants';
import { Mapper } from './application/mapper';

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
    // services
    this.container.bind<UserService>(TYPES.UserService).to(UserService);
    this.container.bind<LoginService>(TYPES.LoginService).to(LoginService);

    // mapper
    this.container.bind<Mapper>(TYPES.Mapper).to(Mapper);

    // middlewares
    this.container.bind<CheckUserExistsMiddleware>(TYPES.CheckUserExistsMiddleware).to(CheckUserExistsMiddleware);
    this.container.bind<CheckDuplicateEmailMiddleware>(TYPES.CheckDuplicateEmailMiddleware).to(CheckDuplicateEmailMiddleware);

    // usecases
    this.container.bind<SignupUsecase>(TYPES.SignupUsecase).to(SignupUsecase);
    this.container.bind<CreateuserUsecase>(TYPES.CreateuserUsecase).to(CreateuserUsecase);
    this.container.bind<LoginUsecase>(TYPES.LoginUsecase).to(LoginUsecase);
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
      app.use(helmet());
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
