export interface IAccount {
  accountId: string;
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

export interface ICurrency {
  currencyId: number;
  name: string;
  symbol: string;
  code: string;
}

export interface IOwner {
  ownerId: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  preferedCurrency?: string;
  savedAccounts: string[];
}
