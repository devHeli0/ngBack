import { Transaction } from '../models';
import { TransactionEntity } from '../../../domain/entities';
import { ITransactionRepository } from '../../../interfaces';

export class TransactionRepository implements ITransactionRepository {
  async createTransaction(
    transactionData: any
  ): Promise<TransactionEntity> {
    const newTransaction = await Transaction.create({
      id: transactionData.id,
      debitedAccountId: transactionData.debitedAccountId,
      creditedAccountId: transactionData.creditedAccountId,
      creationDate: new Date(),
    });
    return newTransaction;
  }
}
