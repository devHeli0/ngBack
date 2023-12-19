import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import 'reflect-metadata';
import 'dotenv/config';
import config from './config';

class Database {
  public sequelize: Sequelize;
  constructor() {
    this.sequelize = new Sequelize(config);
    this.sequelize.addHook('afterBulkSync', () => {
      console.log('Models sincronizados:', this.sequelize.models);
    });
  }
}

const database = new Database().sequelize;

export default database;
