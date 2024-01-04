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
  userExists(username: string): Promise<boolean>
  createUser(username: string, password: string): Promise<UserEntity>
  getUserByUsername(username: string): Promise<UserEntity | null>
  getUserById(userId: number): Promise<UserEntity | null>
  getAllUsers(): Promise<UserEntity[]>
  hashPassword(password: string): Promise<string>
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>
}

export interface IUserService {
  registerUser(username: string, password: string): Promise<UserEntity>
}
