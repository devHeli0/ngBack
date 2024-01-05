import { TransactionEntity } from '../domain/entities'
import { ITransactionRepository } from '../interfaces' // Adjust the import path

export class TransactionUseCase {
  private readonly transactionRepository: ITransactionRepository

  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository
  }

  async getTransactionDetails(transactionId: string): Promise<void> {
    const transactionDetails: TransactionEntity | null =
      await this.transactionRepository.getTransaction(transactionId)

    if (transactionDetails) {
      console.log('Transaction Details:', transactionDetails)
    } else {
      console.log('Transaction not found')
    }
  }
}
