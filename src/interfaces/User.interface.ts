import { UserEntity } from '../domain/entities'

export interface IUser {
  id?: number
  username: string
  password: string
  creationDate: Date
  updatedOn: Date
  deletionDate?: Date
}

export interface IUserRepository {
  createUser(username: string, password: string): Promise<UserEntity>
  getUserById(userId: number): Promise<UserEntity | null>
  getAllUsers(): Promise<UserEntity[]>
}

export interface IUserService {
  registerUser(username: string, password: string): Promise<UserEntity>
}
