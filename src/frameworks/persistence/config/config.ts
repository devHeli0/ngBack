import 'dotenv/config'
import { SequelizeOptions } from 'sequelize-typescript'

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env

const config: SequelizeOptions = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  dialect: 'postgres',
}

export = config
