import { AccountEntity, UserEntity } from '../domain/entities';
import { IAccountRepository, IUserRepository } from '../interfaces';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map(
      (user: UserEntity) =>
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

    const newAccount =
      await this.accountRepository.createAccountForUser(newUser.id);

    const user = new UserEntity(
      newUser.id,
      newUser.username,
      newUser.password,
      newUser.creationDate,
      newUser.updatedOn,
      newUser.deletionDate
    );

    const account = new AccountEntity(newAccount.id, newUser.id, 100);

    return { user, account };
  }
}
