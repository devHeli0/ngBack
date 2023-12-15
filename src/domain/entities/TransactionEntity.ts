export class TransactionEntity {
  constructor(
    public id: string,
    public debitedAccountId: string,
    public creditedAccountId: string,
    public value: number,
    public creationDate: Date,
  ) {}
}
