import { Transaction } from '../models'
import { v4 as uuidv4 } from 'uuid'
import { ITransactionRepository } from '../../../interfaces'
import { TransactionEntity } from '../../../domain/entities'

export class TransactionRepository implements ITransactionRepository {
  async createTransaction(
    transactionData: TransactionEntity,
  ): Promise<TransactionEntity> {
    const newTransaction = await Transaction.create({
      id: uuidv4(),
      debitedAccountId: transactionData.debitedAccountId,
      creditedAccountId: transactionData.creditedAccountId,
      value: transactionData.value,
      creationDate: new Date(),
    })

    return {
      id: newTransaction.id,
      debitedAccountId: newTransaction.debitedAccountId,
      creditedAccountId: newTransaction.creditedAccountId,
      value: newTransaction.value,
      creationDate: newTransaction.creationDate,
    }
  }

  async getTransaction(id: string): Promise<TransactionEntity | null> {
    const transactionDetails = await Transaction.findOne({
      where: {
        id: id,
      },
    })

    return transactionDetails
  }
}
