import { Account } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { IAccountRepository } from '../../../interfaces';

export class AccountRepository implements IAccountRepository {
  async createAccountForUser(userId: number): Promise<Account> {
    const balanceDefaultValue: number = 100;
    const newAccount = await Account.create({
      id: uuidv4(),
      userId: userId,
      balance: balanceDefaultValue,
    });
    return newAccount;
  }
}
