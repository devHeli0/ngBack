import { ITransaction, ITransactionRepository } from '.'
import { AccountEntity } from '../domain/entities'

export interface IAccount {
  id: string
  balance: number
  userId: number
  realizedTransactions?: ITransaction[]
  creationDate?: Date
  updatedOn?: Date
  deletionDate?: Date
}

export interface IAccountRepository {
  createAccountForUser(userId: number): Promise<AccountEntity>
  transferValue(
    id: string,
    debitedAccountId: string,
    creditedAccountId: string,
    value: number,
    creationDate: Date,
    TransactionRepository: ITransactionRepository,
  ): Promise<{ transference: boolean } | { error: string }>
}

export interface IAccountService {
  getAccount(): Promise<IAccount>
}
