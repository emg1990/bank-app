export interface IAccount {
  id: string;
  ownerId: number;
  ownerDisplayName: string;
  currency: string;
  balance?: number;
  name?: string;
}

export interface ITransfer {
  id: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  date: number;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

export interface IOwner {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  address: string;
  phone: string;
  preferedCurrency?: string;
  savedAccounts: string[];
}
