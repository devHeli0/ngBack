export class TransactionEntity {
    constructor(
      public id: number,
      public debitedAccountId: number,
      public creditedAccountId: number,
      public value: number,
      public createdAt: Date,
      public updatedAt?: Date
    ) {}
  }