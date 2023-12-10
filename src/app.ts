import { Server } from '@overnightjs/core';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UserController } from './controlers';
import { DatabaseInitializer } from './frameworks/persistence';
import { GetAllUsersUseCase, RegisterUserUseCase } from './useCases';
import { UserRepository } from './frameworks/persistence/repositories/userRepository';

require('dotenv').config();

class App extends Server {
  private port = process.env.PORT;

  constructor() {
    super();
    this.configureMiddleware();
    this.setupControllers();
    this.setupErrorHandling();
    this.boostrap();
    this.listen();
  }

  public getApp() {
    return this.app;
  }

  private configureMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupDependencies() {
    const userRepository = new UserRepository();
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    const registerUserUseCase = new RegisterUserUseCase(
      userRepository
    );

    return {
      getAllUsersUseCase,
      registerUserUseCase,
    };
  }

  private setupControllers() {
    const { getAllUsersUseCase, registerUserUseCase } =
      this.setupDependencies();

    const userController = new UserController(
      getAllUsersUseCase,
      registerUserUseCase
    );

    super.addControllers([userController]);
  }

  private setupErrorHandling() {
    this.app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send('Something broke!');
    });
  }

  private async boostrap() {
    await DatabaseInitializer.init();
  }

  private listen(): void {
    this.app.listen(this.port, () =>
      console.log(`App is running on http://localhost:${this.port}`)
    );
  }
}

export default new App().getApp();
