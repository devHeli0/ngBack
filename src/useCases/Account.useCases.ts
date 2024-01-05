import { IAccountRepository, ITransactionRepository } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'

export class TransferValueUseCase {
  constructor(
    private accountReposity: IAccountRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    debitedAccountId: string,
    creditedAccountId: string,
    value: number,
  ): Promise<{ transference: boolean } | { error: string }> {
    const id: string = uuidv4()
    const creationDate: Date = new Date()

    if (!value || !creditedAccountId) {
      const errorReason = `${!value ? 'value' : ''}${
        !value && !creditedAccountId ? ' and ' : ''
      }${!creditedAccountId ? 'CreditedAccountId' : ''} is missing`

      return { error: `${errorReason}` }
    }

    const transference = await this.accountReposity.transferValue(
      id,
      debitedAccountId,
      creditedAccountId,
      value,
      creationDate,
      this.transactionRepository,
    )

    return transference
  }
}
