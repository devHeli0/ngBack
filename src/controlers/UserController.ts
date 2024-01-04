import { Request, Response } from 'express'
import { ClassErrorMiddleware, Controller, Get, Post } from '@overnightjs/core'
import {
  GetAllUsersUseCase,
  GetUserUseCase,
  RegisterUserUseCase,
} from '../useCases'
import { UserEntity } from '../domain/entities'
import errorHandlerMiddleware from '../middlewares/errorHandlerMiddleware'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

@ClassErrorMiddleware(errorHandlerMiddleware)
@Controller('user')
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserUseCase: GetUserUseCase,
    private registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Get('getUser')
  async getUser(req: Request, res: Response): Promise<void> {
    const { username } = req.body
    const user: UserEntity | null =
      await this.getUserUseCase.byUsernameExecute(username)
    res.status(200).json(user)
  }

  @Get('getAllUsers')
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users: UserEntity[] = await this.getAllUsersUseCase.execute()
    res.status(200).json(users)
  }

  @Post('register')
  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { username, password } = req.body

    const response = await this.registerUserUseCase.execute(username, password)

    if ('error' in response) {
      const err = {
        statusCode: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.BAD_REQUEST,
        data: { error: response.error },
      }
      return next(err)
    }

    res.status(201).json(response)
  }
}
