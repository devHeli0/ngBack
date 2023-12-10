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
} from 'sequelize-typescript';
import { IAccount } from '../../../interfaces';
import User from './User.model';
import Transaction from './Transaction.model';

@Table({ tableName: 'Accounts' })
class Account extends Model<IAccount> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 100,
  })
  balance: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Transaction)
  realizedTransactions: Transaction[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default Account;
