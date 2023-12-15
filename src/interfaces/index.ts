import {
  IUser,
  IUserRepository,
  IUserService,
} from './User.interface';
import { IAccount, IAccountRepository } from './Account.interface';
import {
  ITransaction,
  ITransactionRepository,
} from './Transaction.interface';
import { IDatabaseConfig } from './Database.interface';

export {
  //Database
  IDatabaseConfig,

  //User
  IUser,
  IUserService,
  IUserRepository,

  //Account
  IAccount,
  IAccountRepository,

  //Transaction
  ITransaction,
  ITransactionRepository,
};
