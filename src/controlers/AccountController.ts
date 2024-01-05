import { Request, Response, NextFunction } from 'express'
import { ClassErrorMiddleware, Controller, Post } from '@overnightjs/core'

import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { errorHandlerMiddleware } from '../middlewares'
import { TransferValueUseCase } from '../useCases'

@ClassErrorMiddleware(errorHandlerMiddleware)
@Controller('account')
export class AccountController {
  constructor(private transferValueUseCase: TransferValueUseCase) {}

  @Post('transferValue')
  async transferValue(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const debitedAccountId = '6063e925-eaf8-4b70-b2cd-fbd0c45949b5'
    const { creditedAccountId, value } = req.body

    const response = await this.transferValueUseCase.execute(
      debitedAccountId,
      creditedAccountId,
      value,
    )

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
