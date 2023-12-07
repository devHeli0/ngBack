import { Sequelize } from 'sequelize-typescript';
import 'reflect-metadata';
import 'dotenv/config';

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: Number(process.env.DB_PORT),
      logging: false,
      models: [__dirname + '/../models/**/*.model.ts'],
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf('.model')) ===
          member.toLowerCase()
        );
      },
    });
    this.sequelize.addHook('afterBulkSync', () => {
      console.log('Models sincronizados:', this.sequelize.models);
    });
  }
}

const database = new Database().sequelize;

export default database;
