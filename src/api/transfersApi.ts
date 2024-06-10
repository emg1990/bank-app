import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { ICurrency, ITransfer } from '../util/types';
import { BASE_URL } from '../config';
import { getAccountById, updateAccount } from './accountsApi';
import { getCurrencyConvertedAmount, roundDecimal } from '../util/helpers';
import { getCurrencies } from './currenciesApi';

// Transfers Endpoints
/**
 * Retrieves a list of transfers from the server.
 * @returns A promise that resolves to an array of transfer objects.
 * @throws Error if there is an error fetching the transfers or if the owner is not authorized or does not have permission.
 */
export const getTransfers = async (): Promise<ITransfer[]> => {
  try {
    const response: AxiosResponse<ITransfer[]> = await axios.get(`${BASE_URL}/transfers`);
    // Ordering should be done in BE
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

/**
 * Creates a new transfer.
 *
 * @param transfer - The transfer object containing the details of the transfer.
 * @returns A Promise that resolves to the created transfer.
 * @throws An error if the transfer creation fails.
 */
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
    await updateAccount({ ...fromAccount, balance: roundDecimal(fromAccount.balance as number - transfer.amount) });
    await updateAccount({ ...toAccount, balance: roundDecimal((toAccount.balance || 0) + toAccountBalance) });
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
