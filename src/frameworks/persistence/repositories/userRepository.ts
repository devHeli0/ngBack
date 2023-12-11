// UserRepository.ts
import {
  IAccount,
  IUser,
  IUserRepository,
} from '../../../interfaces';
import { User } from '../models';

export class UserRepository implements IUserRepository {
  async createUser(
    username: string,
    password: string
  ): Promise<User> {
    const newUser = await User.create({
      username,
      password,
    });

    return newUser;
  }
  getUserById(userId: number): Promise<IUser | null> {
    throw new Error('Method not implemented.');
  }

  // Ajuste no método getAllUsers na classe UserRepository
  async getAllUsers(): Promise<IUser[]> {
    const users = await User.findAll();
    const mappedUsers: IUser[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
      accountId: user.account as unknown as IAccount,
    }));
    return mappedUsers;
  }
}
