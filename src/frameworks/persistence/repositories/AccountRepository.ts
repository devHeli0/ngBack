import { Account } from '../models'
import { v4 as uuidv4 } from 'uuid'
import { IAccountRepository, ITransactionRepository } from '../../../interfaces'
import { AccountEntity } from '../../../domain/entities'

export class AccountRepository implements IAccountRepository {
  async createAccountForUser(userId: number): Promise<AccountEntity> {
    const balanceDefaultValue: number = 100
    const newAccount = await Account.create({
      id: uuidv4(),
      userId: userId,
      balance: balanceDefaultValue,
    })
    return {
      id: newAccount.id,
      userId: newAccount.userId,
      balance: newAccount.balance,
    }
  }

  async transferValue(
    id: string,
    debitedAccountId: string,
    creditedAccountId: string,
    value: number,
    creationDate: Date,
    transactionRepository: ITransactionRepository,
  ): Promise<{ transference: boolean } | { error: string }> {
    const transaction = await Account.sequelize?.transaction()

    if (!transaction) return { error: 'ruim' }

    const debitedAccount = await Account.findByPk(debitedAccountId, {
      transaction,
    })
    const creditedAccount = await Account.findByPk(creditedAccountId, {
      transaction,
    })

    if (!debitedAccount || !creditedAccount) {
      await transaction?.rollback()
      throw new Error('Invalid account IDs')
    }

    if (debitedAccount.balance < value) {
      await transaction?.rollback()
      throw new Error('Insufficient balance')
    }

    debitedAccount.balance -= value
    creditedAccount.balance += value

    await debitedAccount.save({ transaction })
    await creditedAccount.save({ transaction })

    await transactionRepository.createTransaction({
      id,
      debitedAccountId,
      creditedAccountId,
      value,
      creationDate,
    })

    await transaction?.commit()
    return { transference: true }
  }
}
