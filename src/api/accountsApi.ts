import axios, { AxiosError, type AxiosResponse } from 'axios';
import { IAccount } from '../util/types';
import { BASE_URL, OWNER_ID } from '../config';
import { addOwnerSavedAccounts } from './ownersApi';

// Accounts Endpoints
export const getAccounts = async (savedAccounts: string[]): Promise<IAccount[]> => {
  try {
    const response: AxiosResponse<IAccount[]> = await axios.get(`${BASE_URL}/accounts`);
    // should not need to provide savedAccounts, filter should be done in BE
    // TODO filter my accounts first
    return response.data.filter(account => (
      savedAccounts.includes(account.id) || account.ownerId === OWNER_ID // doing simple ownerId validation due to json-server only accepting ids as string
    ))
  } catch (error) {
    console.error("Error fetching accounts", error);
    throw error;
  }
};

export const getMyAccounts = async (ownerId: number): Promise<IAccount[]> => {
  try {
    const response: AxiosResponse<IAccount[]> = await axios.get(`${BASE_URL}/accounts?ownerId=${ownerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching account with owner id ${ownerId}`, error);
    throw error;
  }
};

export const getAccountById = async (id: number): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.get(`${BASE_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        throw new Error(`Account with ID ${id} not found`);
      } else if (axiosError.response?.status === 401) {
        throw new Error(`You are not authorized to access this account`);
      } else if (axiosError.response?.status === 403) {
        throw new Error(`You do not have permission to access this account`);
      }
    }
    throw new Error(`Oops! Something went wrong please try again later`);
  }
};

export const createAccount = async (account: IAccount): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.put(`${BASE_URL}/accounts/${account.id}`, account);
    // This should be added in the backend
    await addOwnerSavedAccounts(account.id);
 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        throw new Error(`You are not authorized to create an account`);
      } else if (axiosError.response?.status === 403) {
        throw new Error(`You do not have permission to create an account`);
      }
    }
    throw new Error(`Oops! Something went wrong please try again later`);
  }
};

export const updateAccount = async (account: IAccount): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.put(`${BASE_URL}/accounts/${account.id}`, account);
 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        throw new Error(`You are not authorized to update an account`);
      } else if (axiosError.response?.status === 403) {
        throw new Error(`You do not have permission to update an account`);
      }
    }
    throw new Error(`Oops! Something went wrong please try again later`);
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
