import { Request, Response } from 'express'
import { Controller, Post } from '@overnightjs/core'
import { AuthUserUseCase } from '../useCases'

@Controller('login')
export class AuthController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  @Post('')
  public async login(req: Request, res: Response): Promise<Response | void> {
    const { username, password } = req.body

    try {
      const token = await this.authUserUseCase.authenticateUser(
        username,
        password,
      )
      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(401).json(error)
    }
  }
}
