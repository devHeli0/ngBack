import { AccountEntity, UserEntity } from '../domain/entities'
import { IAccountRepository, IUserRepository } from '../interfaces'
import { sign } from 'jsonwebtoken'

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async byIdExecute(id: number): Promise<UserEntity | null> {
    const foundUser = await this.userRepository.getUserById(id)
    if (foundUser) {
      const user = new UserEntity(
        foundUser.id,
        foundUser.username,
        foundUser.password,
        foundUser.creationDate,
        foundUser.updatedOn,
        foundUser.deletionDate,
      )
      return user
    }
    return null
  }

  async byUsernameExecute(username: string): Promise<UserEntity | null> {
    const foundUser = await this.userRepository.getUserByUsername(username)
    if (foundUser) {
      const user = new UserEntity(
        foundUser.id,
        foundUser.username,
        foundUser.password,
        foundUser.creationDate,
        foundUser.updatedOn,
        foundUser.deletionDate,
      )
      return user
    }
    return null
  }
}

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.getAllUsers()
    return users.map(
      (user: UserEntity) =>
        new UserEntity(
          user.id,
          user.username,
          user.password,
          user.creationDate,
          user.updatedOn,
          user.deletionDate,
        ),
    )
  }
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private accountRepository: IAccountRepository,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<{ user: UserEntity; account: AccountEntity } | { error: string }> {
    if (!username || !password) {
      const errorReason = `${!username ? 'Username' : ''}${
        !username && !password ? ' and ' : ''
      }${!password ? 'Password' : ''} is missing`

      return { error: `${errorReason}` }
    }

    const userExists = await this.userRepository.userExists(username)

    if (userExists) {
      return { error: 'Username already exists' }
    }

    const hashedPassword = await this.userRepository.hashPassword(password)

    const newUser = await this.userRepository.createUser(
      username,
      hashedPassword,
    )

    const newAccount = await this.accountRepository.createAccountForUser(
      newUser.id,
    )

    const user = new UserEntity(
      newUser.id,
      newUser.username,
      newUser.password,
      newUser.creationDate,
      newUser.updatedOn,
      newUser.deletionDate,
    )

    const account = new AccountEntity(newAccount.id, newUser.id, 100)

    return { user, account }
  }
}

export class AuthUserUseCase {
  private readonly SECRET: string

  constructor(
    private userRepository: IUserRepository,
    secret: string = String(process.env.SECRET),
  ) {
    this.SECRET = secret
  }

  async authenticateUser(username: string, password: string): Promise<string> {
    try {
      const foundUser = await this.userRepository.getUserByUsername(username)

      if (
        foundUser &&
        (await this.userRepository.verifyPassword(password, foundUser.password))
      ) {
        const token = sign({ id: foundUser.id }, this.SECRET, {
          expiresIn: '1d',
        })

        return token
      }

      return 'Authentication failed'
    } catch (error) {
      console.error('Authentication error:', error)
      throw new Error('Authentication failed')
    }
  }
}
