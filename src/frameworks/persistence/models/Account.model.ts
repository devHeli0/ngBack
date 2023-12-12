import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  HasMany,
  AllowNull,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';
import { IAccount } from '../../../interfaces';
import User from './User.model';
import Transaction from './Transaction.model';
import { NonAttribute, UUIDV4 } from 'sequelize';
import { UUID } from 'crypto';

const DEFAULT_BALANCE = 100;

@Table({ tableName: 'Accounts' })
class Account extends Model<IAccount> {
  @AllowNull(false)
  @PrimaryKey
  @Column(UUIDV4)
  declare id: UUID;

  @Default(DEFAULT_BALANCE)
  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare balance: number;

  @BelongsTo(() => User, 'userId')
  declare user?: NonAttribute<User>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @HasMany(() => Transaction, 'debitedAccountId')
  realizedTransactions: Transaction[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default Account;
