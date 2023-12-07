import database from './config/database';

export class DatabaseInitializer {
  static async init() {
    try {
      await database.authenticate();
      await database.sync({ alter: true });
    } catch (error) {
      console.error('Erro ao conectar ao banco:', error);
    }
  }
}
