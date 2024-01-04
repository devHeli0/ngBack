import { Request, Response, NextFunction } from 'express'
import { ClassErrorMiddleware, Controller, Get, Post } from '@overnightjs/core'
import {
  GetAllUsersUseCase,
  GetUserUseCase,
  RegisterUserUseCase,
} from '../useCases'
import { UserEntity } from '../domain/entities'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { errorHandlerMiddleware } from '../middlewares'

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
    res.status(StatusCodes.OK).json(user)
  }

  @Get('getAllUsers')
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users: UserEntity[] = await this.getAllUsersUseCase.execute()
    res.status(StatusCodes.OK).json(users)
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

    res.status(StatusCodes.CREATED).json(response)
  }
}
