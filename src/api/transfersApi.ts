import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { ICurrency, ITransfer } from '../util/types';
import { BASE_URL } from '../config';
import { getAccountById, updateAccount } from './accountsApi';
import { getCurrencyConvertedAmount } from '../util/helpers';
import { getCurrencies } from './currenciesApi';

// Transfers Endpoints
export const getTransfers = async (): Promise<ITransfer[]> => {
  try {
    const response: AxiosResponse<ITransfer[]> = await axios.get(`${BASE_URL}/transfers`);
    // Filtering should be done in BE
    return response.data.reverse();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        return [];
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to fetch transfers");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to fetch transfers");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

export const getTransferById = async (id: number): Promise<ITransfer> => {
  try {
    const response: AxiosResponse<ITransfer> = await axios.get(`${BASE_URL}/transfers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transfer with ID ${id}`, error);
    throw error;
  }
};

export const createTransfer = async (transfer: Omit<ITransfer, "id">): Promise<ITransfer> => {
  try {
    const newTrasfer = { ...transfer, id: new Date().getTime() }; // Generate a unique ID which should be done in BE
    const response: AxiosResponse<ITransfer> = await axios.post(`${BASE_URL}/transfers`, newTrasfer);
    // Update the accounts balance should be done in BE
    const fromAccount = await getAccountById(transfer.fromAccount);
    const toAccount = await getAccountById(transfer.toAccount);
    const currencies = await getCurrencies();
    // Convert the amount to the destination account currency
    const toAccountBalance = getCurrencyConvertedAmount(
      transfer.amount,
      currencies.find((currency) => currency.code === fromAccount.currency) as ICurrency,
      currencies.find((currency) => currency.code === toAccount.currency) as ICurrency
    );
    await updateAccount({ ...fromAccount, balance: fromAccount.balance as number - transfer.amount });
    await updateAccount({ ...toAccount, balance: (toAccount.balance || 0) + toAccountBalance });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error(`You are not authorized to create transfers`);
      } else if (axiosError.response?.status === 403) {
        throw new Error(`You do not have permission to create transfers`);
      }
    }
    throw new Error(`Oops! Something went wrong please try again later`);
  }
};
