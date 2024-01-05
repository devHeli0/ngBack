import { Server } from '@overnightjs/core'
import cors from 'cors'
import bodyParser from 'body-parser'
import { AuthController, UserController } from './controlers'
import { DatabaseInitializer } from './frameworks/persistence'
import {
  AuthUserUseCase,
  GetAllUsersUseCase,
  GetUserUseCase,
  RegisterUserUseCase,
  TransferValueUseCase,
} from './useCases'
import { UserRepository } from './frameworks/persistence/repositories/UserRepository'
import { AccountRepository } from './frameworks/persistence/repositories/AccountRepository'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'

import dotenv from 'dotenv'
import { TransactionRepository } from './frameworks/persistence/repositories/TransactionRepository'
import { AccountController } from './controlers/AccountController'
dotenv.config()

class App extends Server {
  private port = process.env.PORT

  constructor() {
    super(true)
    this.configureMiddleware()
    this.setupControllers()
    this.boostrap()
    this.listen()
  }

  public getApp() {
    return this.app
  }

  private configureMiddleware() {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(errorHandlerMiddleware)
  }

  private setupDependencies() {
    const userRepository = new UserRepository()
    const accountRepository = new AccountRepository()
    const authUserUseCase = new AuthUserUseCase(userRepository)
    const getUserUseCase = new GetUserUseCase(userRepository)
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
    const registerUserUseCase = new RegisterUserUseCase(
      userRepository,
      accountRepository,
    )
    const transactionRepository = new TransactionRepository()
    const transferValueUseCase = new TransferValueUseCase(
      accountRepository,
      transactionRepository,
    )

    return {
      transferValueUseCase,
      authUserUseCase,
      getAllUsersUseCase,
      getUserUseCase,
      registerUserUseCase,
    }
  }

  private setupControllers() {
    // const server = new InversifyExpressServer(this.container);

    const {
      transferValueUseCase,
      authUserUseCase,
      getAllUsersUseCase,
      registerUserUseCase,
      getUserUseCase,
    } = this.setupDependencies()

    const userController = new UserController(
      getAllUsersUseCase,
      getUserUseCase,
      registerUserUseCase,
    )

    const authController = new AuthController(authUserUseCase)

    const accountController = new AccountController(transferValueUseCase)

    super.addControllers([userController, authController, accountController])
  }

  private async boostrap() {
    await DatabaseInitializer.init()
  }

  private listen(): void {
    this.app.listen(this.port, () =>
      console.log(`App is running on http://localhost:${this.port}`),
    )
  }
}

export default new App().getApp()
