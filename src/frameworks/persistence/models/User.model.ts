import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  Length,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { IUser } from '../../../interfaces';
import { CreationOptional } from 'sequelize';

@Table({ tableName: 'Users' })
class User extends Model<IUser> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Length({ min: 3, max: 15 })
  @Unique
  @AllowNull(false)
  @Column(DataType.TEXT)
  declare username: string;

  @AllowNull(false)
  @Column(DataType.CHAR)
  declare password: string;

  @CreatedAt
  declare creationDate: Date;

  @UpdatedAt
  declare updatedOn: Date;

  @DeletedAt
  declare deletionDate: Date;
}

export default User;
