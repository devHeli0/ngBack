import { UUID } from "crypto";

export interface ITransaction {
  id: UUID;
  debitedAccountId: number;
  creditedAccountId: number;
}

export interface IAccountService {
  getAllTransactions(): Promise<ITransaction[]>;
}
