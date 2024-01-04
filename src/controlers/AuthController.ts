import { NextFunction, Request, Response } from 'express'
import { ClassErrorMiddleware, Controller, Post } from '@overnightjs/core'
import { AuthUserUseCase } from '../useCases'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { errorHandlerMiddleware } from '../middlewares'

@ClassErrorMiddleware(errorHandlerMiddleware)
@Controller('login')
export class AuthController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  @Post('')
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { username, password } = req.body

    const response = await this.authUserUseCase.authenticateUser(
      username,
      password,
    )

    if ('error' in response) {
      const err = {
        statusCode: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.BAD_REQUEST,
        data: { error: response.error },
      }
      return next(err)
    }

    res.status(StatusCodes.OK).json(response)
  }
}
