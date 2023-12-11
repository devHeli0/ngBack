export interface IAccount {
  id: string;
  balance?: number;
  userId: number;
}

export interface IAccountService {
  getAccount(): Promise<IAccount>;
}
