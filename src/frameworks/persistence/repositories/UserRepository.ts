import { UserEntity } from '../../../domain/entities'
import { IUserRepository } from '../../../interfaces'
import { User } from '../models'

import bcrypt from 'bcrypt'

export class UserRepository implements IUserRepository {
  async userExists(username: string): Promise<boolean> {
    const user = await User.findOne({ where: { username } })
    return !!user
  }

  async createUser(username: string, password: string): Promise<UserEntity> {
    const newUser = await User.create({
      username,
      password,
      creationDate: new Date(),
      updatedOn: new Date(),
    })

    return newUser
  }

  async getUserById(userId: number): Promise<UserEntity | null> {
    const user = await User.findByPk(userId)
    if (user) {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        creationDate: user.creationDate,
        updatedOn: user.updatedOn,
      }
    }
    return null
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { username } })
    if (user) {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        creationDate: user.creationDate,
        updatedOn: user.updatedOn,
      }
    }
    return null
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await User.findAll({
      attributes: ['id', 'username', 'creationDate', 'updatedOn'],
    })
    const mappedUsers: UserEntity[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
      creationDate: user.creationDate,
      updatedOn: user.updatedOn,
    }))
    return mappedUsers
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    const rehashedPassword = await bcrypt.hash(password, saltRounds)
    return rehashedPassword
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)
    return isPasswordValid
  }
}
