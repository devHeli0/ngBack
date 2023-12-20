import { TransactionEntity } from '../domain/entities'

export interface ITransaction {
  id: string
  debitedAccountId: string
  creditedAccountId: string
  creationDate: Date
}

export interface ITransactionRepository {
  createTransaction(transactionData: unknown): Promise<TransactionEntity>
}
