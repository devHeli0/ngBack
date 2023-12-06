import { Model, DataTypes } from 'sequelize';
import ITransaction from '../../../interfaces/ITransaction';
import {
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
class Transaction extends Model<ITransaction> {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column(DataType.UUIDV4)
  debitedAccount: string;

  @Column(DataType.UUIDV4)
  creditedAccount: string;

  @Column(DataType.NUMBER)
  value: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default Transaction;
