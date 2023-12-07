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

@Table({ tableName: 'Users' })
class User extends Model<IUser> {
  @Column(DataType.TEXT)
  username: string;

  @Column(DataType.CHAR)
  password: string;

  @HasOne(() => Account)
  accountId: Account;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default User;
