import { ITransaction } from '.';

export interface IAccount {
  id: string;
  balance: number;
  userId: number;
  realizedTransactions?: ITransaction[];
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date;
}

export interface IAccountService {
  getAccount(): Promise<IAccount>;
}
