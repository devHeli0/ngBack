import { ITransaction } from '.';
import { Account } from '../frameworks/persistence/models';

export interface IAccount {
  id: string;
  balance: number;
  userId: number;
  realizedTransactions?: ITransaction[];
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date;
}

export interface IAccountRepository {
  createAccountForUser(userId: number): Promise<Account>;
  // getAccountById(accountId: string): Promise<IAccount | null>;
}

export interface IAccountService {
  getAccount(): Promise<IAccount>;
}
