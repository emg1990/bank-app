import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { IAccount } from '../util/types';
import { BASE_URL, OWNER_ID } from '../config';
import { addOwnerSavedAccounts, deleteOwnerSavedAccounts } from './ownersApi';

// Accounts Endpoints
export const getAccounts = async (savedAccounts: string[]): Promise<IAccount[]> => {
  try {
    const response: AxiosResponse<IAccount[]> = await axios.get(`${BASE_URL}/accounts`);
    // should not need to provide savedAccounts, filter should be done in BE
    return response.data.filter(account => (
      savedAccounts.includes(account.id)
    ))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        return [];
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to fetch accounts");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to fetch accounts");
      }
    }
    console.error("Error fetching accounts", error);
    throw new Error("Oops! Something went wrong please try again later");
  }
};

export const getMyAccounts = async (): Promise<IAccount[]> => {
  try {
    const response: AxiosResponse<IAccount[]> = await axios.get(`${BASE_URL}/accounts?ownerId=${OWNER_ID}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        return [];
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to fetch accounts");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to fetch accounts");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

export const getAccountById = async (id: string): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.get(`${BASE_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        throw new Error(`Account with ID ${id} not found`);
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to access this account");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to access this account");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
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
        // Should redirect to login page
        throw new Error("You are not authorized to create an account");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to create an account");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
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
        // Should redirect to login page
        throw new Error("You are not authorized to update an account");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to update an account");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

export const deleteAccount = async (account: IAccount): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/accounts/${account.id}`, { ...account, name: '' });
    // This should be added in the backend
    await deleteOwnerSavedAccounts(account.id);
   } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to delete an account");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to delete an account");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};
