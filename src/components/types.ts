export interface IAccount {
  accountId: number;
  ownerId: number;
  currency: string;
  balance: number;
  name?: string;
}

export interface ITransfer {
  transferId: number;
  fromAccount: number;
  toAccount: number;
  amount: number;
  date: string;
}
