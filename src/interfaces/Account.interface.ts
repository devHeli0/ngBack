import { ITransaction } from '.';
import { AccountEntity } from '../domain/entities';

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
  createAccountForUser(userId: number): Promise<AccountEntity>;
}

export interface IAccountService {
  getAccount(): Promise<IAccount>;
}
