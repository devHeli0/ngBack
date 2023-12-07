import { User } from '../frameworks/persistence/models';

export interface IUserRepository {
  createUser(username: string, password: string): Promise<User>;
}
