import { Request, Response } from 'express'

import { Controller, Get, Post } from '@overnightjs/core'

import {
  GetAllUsersUseCase,
  GetUserUseCase,
  RegisterUserUseCase,
} from '../useCases'
import { UserEntity } from '../domain/entities'

@Controller('user')
export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserUseCase: GetUserUseCase,
    private registerUserUseCase: RegisterUserUseCase,
  ) {
    this.getAllUsersUseCase = getAllUsersUseCase
    this.registerUserUseCase = registerUserUseCase
    this.getUserUseCase = getUserUseCase
  }

  @Get('getUser')
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body
      const user: UserEntity | null =
        await this.getUserUseCase.byUsernameExecute(username)
      res.status(200).json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }

  @Get('getAllUsers')
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: UserEntity[] = await this.getAllUsersUseCase.execute()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  @Post('register')
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body
      const { user, account } = await this.registerUserUseCase.execute(
        username,
        password,
      )
      res.status(201).json({ user, account })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
