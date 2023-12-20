import { ITransaction } from '../../../interfaces/Transaction.interface'
import {
  Model,
  Column,
  CreatedAt,
  DataType,
  Table,
  BelongsTo,
  PrimaryKey,
  Default,
  AllowNull,
  IsUUID,
} from 'sequelize-typescript'
import Account from './Account.model'
import { NonAttribute } from 'sequelize'

@Table({ tableName: 'Transactions' })
class Transaction extends Model<ITransaction> {
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @PrimaryKey
  @IsUUID(4)
  @Column
  declare id: string

  @BelongsTo(() => Account, 'debitedAccountId')
  declare debitedAccount?: NonAttribute<Account>

  @AllowNull(false)
  @IsUUID(4)
  @Column
  debitedAccountId: string

  @BelongsTo(() => Account, 'creditedAccountId')
  declare creditedAccount?: NonAttribute<Account>

  @AllowNull(false)
  @IsUUID(4)
  @Column
  creditedAccountId: string

  @AllowNull(false)
  @Column(DataType.FLOAT)
  value: number

  @CreatedAt
  creationDate: Date
}

export default Transaction
