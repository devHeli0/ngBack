import { Container } from 'inversify';
import { AccountRepository } from '../frameworks/persistence/repositories/AccountRepository';
import { IUserRepository, IAccountRepository } from '../interfaces';
import { UserRepository } from '../frameworks/persistence/repositories/UserRepository';
import TYPES from './types';
const container = new Container();

container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container
  .bind<IAccountRepository>('IAccountRepository')
  .to(AccountRepository);

export { container };
