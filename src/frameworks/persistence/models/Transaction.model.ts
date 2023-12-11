import { ITransaction } from '../../../interfaces/Transaction.interface';
import {
  Model,
  Column,
  CreatedAt,
  DataType,
  Table,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import Account from './Account.model';
import { UUID } from 'crypto';

@Table({ tableName: 'Transactions' })
class Transaction extends Model<ITransaction> {
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: UUID;

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  debitedAccountId: string;

  @BelongsTo(() => Account)
  debitedAccount: Account;

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  creditedAccountId: string;

  @BelongsTo(() => Account)
  creditedAccount: Account;

  @Column(DataType.FLOAT)
  value: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default Transaction;
