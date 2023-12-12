import { ITransaction } from '../../../interfaces/Transaction.interface';
import {
  Model,
  Column,
  CreatedAt,
  DataType,
  Table,
  UpdatedAt,
  BelongsTo,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import Account from './Account.model';
import { UUID } from 'crypto';
import { NonAttribute } from 'sequelize';

@Table({ tableName: 'Transactions' })
class Transaction extends Model<ITransaction> {
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: UUID;

  @BelongsTo(() => Account, 'debitedAccountId')
  declare debitedAccount?: NonAttribute<Account>;

  @AllowNull(false)
  @Column(DataType.UUID)
  debitedAccountId: UUID;

  @BelongsTo(() => Account, 'creditedAccountId')
  declare creditedAccount?: NonAttribute<Account>;

  @AllowNull(false)
  @Column(DataType.UUID)
  creditedAccountId: UUID;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  value: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default Transaction;
