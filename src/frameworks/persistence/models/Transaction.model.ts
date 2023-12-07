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
} from 'sequelize-typescript';
import Account from './Account.model';

@Table({ tableName: 'Transactions' })
class Transaction extends Model<ITransaction> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

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
