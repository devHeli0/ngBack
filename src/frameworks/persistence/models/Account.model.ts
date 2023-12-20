import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  HasMany,
  AllowNull,
  Default,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript'
import { IAccount } from '../../../interfaces'
import User from './User.model'
import Transaction from './Transaction.model'
import { NonAttribute } from 'sequelize'

const DEFAULT_BALANCE = 100

@Table({ tableName: 'Accounts' })
class Account extends Model<IAccount> {
  @AllowNull(false)
  @PrimaryKey
  @IsUUID(4)
  @Column
  declare id: string

  @Default(DEFAULT_BALANCE)
  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare balance: number

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  declare user?: NonAttribute<User>

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number

  @HasMany(() => Transaction, 'debitedAccountId')
  realizedTransactions: Transaction[]

  @CreatedAt
  creationDate: Date

  @UpdatedAt
  updatedOn: Date

  @DeletedAt
  deletionDate: Date
}

export default Account
