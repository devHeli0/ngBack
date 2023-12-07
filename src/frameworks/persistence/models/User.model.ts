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
  Length,
  Contains,
  AllowNull,
  BeforeCreate,
} from 'sequelize-typescript';
import { IUser } from '../../../interfaces';
import Account from './Account.model';

@Table({ tableName: 'Users' })
class User extends Model<IUser> {
  @Length({ min: 3, max: 15 })
  @Unique(true)
  @AllowNull(false)
  @Column(DataType.TEXT)
  username: string;

  @Contains('Special')
  @AllowNull(false)
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

  @BeforeCreate
  static async generateAccount(user: User): Promise<void> {
    const account = await Account.create({
      balance: 0,
      id: user.id,
    });

    user.accountId = account.id;
  }
}

export default User;
