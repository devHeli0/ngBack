import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  NotNull,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { IAccount } from '../../../interfaces';
import User from './User.model';
import Transaction from './Transaction.model';
import { NonAttribute } from 'sequelize';

@Table({ tableName: 'Accounts' })
class Account extends Model<IAccount> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Default(100)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  balance: number;

  @BelongsTo(() => User, 'userId')
  declare user?: NonAttribute<User>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @HasMany(() => Transaction, 'debitedAccountId')
  realizedTransactions: Transaction[];

  // @HasMany(() => Transaction, 'creditedAccountId')
  // creditedAccounts: Transaction[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default Account;
