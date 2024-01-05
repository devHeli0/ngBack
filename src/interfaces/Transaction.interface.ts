import { TransactionEntity } from '../domain/entities'

export interface ITransaction {
  id: string
  debitedAccountId: string
  creditedAccountId: string
  value: number
  creationDate: Date
}

export interface ITransactionRepository {
  createTransaction(
    transactionData: TransactionEntity,
  ): Promise<TransactionEntity>
  getTransaction(transactionId: string): Promise<TransactionEntity | null>
}
