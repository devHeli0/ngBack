import { Model, Sequelize } from 'sequelize';
import { IAccount } from '../../../interfaces';
import { Account, User } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { IAccountRepository } from '../../../interfaces/Account.interface';

class AccountRepository implements IAccountRepository {
  async createAccountForUser(user: User): Promise<Account> {
    const balanceDefaultValue: number = 100;
    return await Account.create({
      id: uuidv4(),
      userId: user.id,
      balance: balanceDefaultValue,
    });
  }

  async getAccountById(accountId: string): Promise<IAccount | null> {
    const account = await Account.findByPk(accountId);
    if (account) {
      return {
        id: account.id,
        balance: account.balance,
        userId: account.userId,
        creationDate: account.creationDate,
        updatedOn: account.updatedOn,
      };
    }
    return null;
  }
}

export default AccountRepository;
