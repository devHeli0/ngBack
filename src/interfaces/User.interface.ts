import { User } from '../frameworks/persistence/models';

export interface IUser {
  id: number;
  username: string;
  password: string;
  creationDate: Date;
  updatedOn: Date;
  deletionDate?: Date;
}

export interface IUserRepository {
  createUser(username: string, password: string): Promise<User>;
  getUserById(userId: number): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
}

export interface IUserService {
  registerUser(username: string, password: string): Promise<User>;
}
