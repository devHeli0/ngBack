import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  HasOne,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { IUser } from '../../../interfaces';
import Account from './Account.model';

@Table
class User extends Model<IUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.TEXT)
  username: string;

  @Column(DataType.CHAR)
  password: string;

  @Column(DataType.UUIDV4)
  @ForeignKey(() => Account)
  @HasOne(() => Account, 'accountId')
  accountId: Account;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default User;
