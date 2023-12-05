import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  RegisterRoute,
  UserRoute,
  AccountRoute,
  TransactionRoute,
  AuthRoute,
} from './routes';

require('dotenv').config();

class Server {
  private express: express.Application;
  private port = process.env.PORT;

  constructor() {
    this.express = express();
    this.configureMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private configureMiddleware() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    this.express.use('/register', RegisterRoute);
    this.express.use('/user', UserRoute);
    this.express.use('/account', AccountRoute);
    this.express.use('/transactions', TransactionRoute);
    this.express.use('/auth', AuthRoute);
  }

  private setupErrorHandling() {
    this.express.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  }

  private listen(): void {
    this.express.listen(this.port, () =>
      console.log(
        `Server is running on http://localhost:${this.port}`
      )
    );
  }
}

export default new Server().getApp();
