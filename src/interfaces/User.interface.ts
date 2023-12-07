import { User } from "../frameworks/persistence/models";

export interface IUser {
  id: number;
  username: string;
  password: string;
  accountId: number;
}

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  registerUser(username: string, password: string): Promise<User>;
}
