import { AccountEntity, UserEntity } from '../domain/entities';
import {
  IAccountRepository,
  IUser,
  IUserRepository,
} from '../interfaces';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map(
      (user: IUser) =>
        new UserEntity(
          user.id,
          user.username,
          user.password,
          user.creationDate,
          user.updatedOn,
          user.deletionDate
        )
    );
  }
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private accountRepository: IAccountRepository
  ) {}

  async execute(
    username: string,
    password: string
  ): Promise<{ user: UserEntity; account: AccountEntity }> {
    const newUser = await this.userRepository.createUser(
      username,
      password
    );

    const account = await this.accountRepository.createAccountForUser(
      52
    );

    console.log(`${account} ##################### ${newUser.id}`);

    const user = new UserEntity(
      newUser.id,
      newUser.username,
      newUser.password,
      newUser.creationDate,
      newUser.updatedOn,
      newUser.deletionDate
    );

    const accountEntity = new AccountEntity(
      account.id,
      newUser.id,
      100
    );

    return { user, account: accountEntity };
  }
}
