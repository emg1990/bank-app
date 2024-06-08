import axios, { type AxiosResponse } from 'axios';
import { IAccount } from '../types/types';
import { BASE_URL } from '../config';

// Accounts Endpoints
// should not need to provide savedAccounts, filter should be done in BE
export const getAccounts = async (ownerId: number, savedAccounts: string[]): Promise<IAccount[]> => {
  try {
    const response: AxiosResponse<IAccount[]> = await axios.get(`${BASE_URL}/accounts`);
    return response.data.filter(account => (
      savedAccounts.includes(account.id) || account.ownerId == ownerId // doing simple ownerId validation due to json-server only accepting ids as string
    ))
  } catch (error) {
    console.error("Error fetching accounts", error);
    throw error;
  }
};

export const getAccountById = async (id: number): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.get(`${BASE_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching account with ID ${id}`, error);
    throw error;
  }
};

export const createAccount = async (account: IAccount): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.post(`${BASE_URL}/accounts`, account);
    return response.data;
  } catch (error) {
    console.error("Error creating account", error);
    throw error;
  }
};

export const updateAccount = async (id: number, updatedAccount: IAccount): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.put(`${BASE_URL}/accounts/${id}`, updatedAccount);
    return response.data;
  } catch (error) {
    console.error(`Error updating account with ID ${id}`, error);
    throw error;
  }
};

export const deleteAccount = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/accounts/${id}`);
  } catch (error) {
    console.error(`Error deleting account with ID ${id}`, error);
    throw error;
  }
};
