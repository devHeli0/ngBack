import Database from './config/database';

export class DatabaseInitializer {
  static async init() {
    try {
      await Database.authenticate();
      await Database.sync({ alter: true });
      console.log('Banco e tabela criados!');
    } catch (error) {
      console.error('Erro ao conectar ao banco:', error);
    }
  }
}
