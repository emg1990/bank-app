export interface IAccount {
  id: string;
  ownerId: number;
  ownerDisplayName: string;
  currency: string;
  balance?: number;
  name?: string;
}

export interface ITransfer {
  transferId: number;
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
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
