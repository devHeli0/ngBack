export interface IAccount {
  id: string;
  balance: number;
}

export interface IAccountService {
  getAccount(): Promise<IAccount>;
}
