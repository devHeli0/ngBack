import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  Default,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IAccount } from '../../../interfaces';
import User from './User.model';

@Table
class Account extends Model<IAccount> {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.INTEGER, // ou outro tipo apropriado
    defaultValue: 100,
  })
  balance: number;

  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default Account;
