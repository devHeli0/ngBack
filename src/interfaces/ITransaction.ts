export default interface ITransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
}

export interface IAccountService {
  getAllTransactions(): Promise<ITransaction[]>;
}
