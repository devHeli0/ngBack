import { UserEntity } from '../domain/entities';
import { IUser, IUserRepository } from '../interfaces';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map(
      (user: IUser) =>
        new UserEntity(user.id, user.username, user.password)
    );
  }
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    username: string,
    password: string
  ): Promise<UserEntity> {
    const newUser = await this.userRepository.createUser(
      username,
      password
    );
    return new UserEntity(
      newUser.id,
      newUser.username,
      newUser.password
    );
  }
}
