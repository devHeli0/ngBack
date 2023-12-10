import { IAccount } from '.';
import { User } from '../frameworks/persistence/models';

export interface IUser {
  id: number;
  username: string;
  password: string;
  accountId: IAccount;
}
export interface IUserRepository {
  createUser(username: string, password: string): Promise<User>;
  getUserById(userId: number): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
}

export interface IUserService {
  registerUser(username: string, password: string): Promise<User>;
}
