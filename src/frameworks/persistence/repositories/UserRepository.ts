import { IUser, IUserRepository } from '../../../interfaces';
import { User } from '../models';

export class UserRepository implements IUserRepository {
  async createUser(
    username: string,
    password: string
  ): Promise<User> {
    const newUser = await User.create({
      username,
      password,
      creationDate: new Date(),
      updatedOn: new Date(),
    });

    return newUser;
  }

  async getUserById(userId: number): Promise<IUser | null> {
    const user = await User.findByPk(userId);
    if (user) {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        creationDate: user.creationDate,
        updatedOn: user.updatedOn,
      };
    }
    return null;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await User.findAll({
      attributes: ['id', 'username', 'creationDate', 'updatedOn'],
    });
    const mappedUsers: IUser[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
      creationDate: user.creationDate,
      updatedOn: user.updatedOn,
    }));
    return mappedUsers;
  }
}
