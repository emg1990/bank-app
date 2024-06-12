import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { IAccount } from '../util/types';
import { BASE_URL, OWNER_ID } from '../config';
import { addOwnerSavedAccounts, deleteOwnerSavedAccounts, getOwner } from './ownersApi';

// Accounts Endpoints
/**
 * Retrieves a list of accounts associated to the owner.
 * 
 * @param savedAccounts - An array of account IDs that should be filtered on the server.
 * @returns A promise that resolves to an array of accounts.
 * @throws An error if there is an issue with the request or if the owner is not authorized or does not have permission.
 * @throws An error if an unexpected error occurs.
 */
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
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Retrieves the accounts associated with the current owner.
 * @returns A promise that resolves to an array of IAccount objects.
 * @throws Error if there is an error fetching the accounts or if the owner is not authorized or does not have permission.
 * @throws Error if an unexpected error occurs.
 */
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
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Retrieves an account by its ID.
 * @param id - The ID of the account to retrieve.
 * @returns A Promise that resolves to the retrieved account.
 * @throws Error if the account is not found, the user is not authorized, or there is a permission issue.
 * @throws Error if an unexpected error occurs.
 */
export const getAccountById = async (id: string): Promise<IAccount> => {
  try {
    const response: AxiosResponse<IAccount> = await axios.get(`${BASE_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        throw new Error(`Account with ID ${id} was not found`);
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to access this account");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to access this account");
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Retrieves a validated account by its ID, an account is validated if
 *  1. The account does not belong to the owner.
 *  2. The account is not already added to the owner's saved accounts.
 * 
 * @param id - The ID of the account to retrieve.
 * @returns A Promise that resolves to the validated account.
 * @throws An error if the account is already added.
 */
export const getValidatedAccount = async (id: string): Promise<IAccount> => {
  const account = await getAccountById(id);
  const owner = await getOwner();
  // This validation should be added in the backend
  if (account.ownerId == OWNER_ID || owner.savedAccounts.includes(account.id)) {
    throw new Error("This account is already in your Accounts list.");
  }
  return account;
};

/**
 * Adds an account that already exits in DB which has another owner to the current owner's list.
 * This should create a relationship between the account and the current owner in a real DB.
 * @param account - The account object to be added to the list.
 * @returns A Promise that resolves to the added account.
 * @throws Error if there is an authorization or permission issue, or if something goes wrong during the creation process.
 * @throws Error if an unexpected error occurs.
 */
export const addAccount = async (account: IAccount): Promise<IAccount> => {
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
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Creates a new account checking if the account already exists.
 * @param account - The account object to be created.
 * @returns A promise that resolves to the created account.
 * @throws An error if the account already exists, the user is not authorized, or there is a server error.
 */
export const createAccount = async (account: IAccount): Promise<IAccount> => {
  try {
    // This will check if the account already exists, it is expected to throw a 404 error
    await axios.get(`${BASE_URL}/accounts/${account.id}`);
    throw new Error("An account with that ID already exists");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        try {
          const response: AxiosResponse<IAccount> = await axios.post(`${BASE_URL}/accounts`, account);
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            if (axiosError.response?.status === 401) {
              // Should redirect to login page
              throw new Error("You are not authorized to create an account");
            } else if (axiosError.response?.status === 403) {
              throw new Error("You do not have permission to create an account");
            } else if (axiosError.code === "ERR_NETWORK") {
              throw new Error("Our server is currently offline. Please try again later.");
            }
          }
        }
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Updates the name/alias of an account.
 * @param account - The account object to be updated.
 * @returns A Promise that resolves to the updated account.
 * @throws An error if the user is not authorized or does not have permission to update the account,
 * or if an unexpected error occurs.
 * @throws Error if an unexpected error occurs.
 */
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
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Deletes an account from the owner's list.
 *
 * @param account - The account to be deleted.
 * @throws Error - If the user is not authorized or does not have permission to delete the account, or if an error occurs during the deletion process.
 */
export const removeAccountFromList = async (account: IAccount): Promise<void> => {
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
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Deletes an account that belongs to the current user.
 * @param account - The account to be deleted.
 * @throws {Error} If the user is not authorized to delete the account.
 * @throws {Error} If the user does not have permission to delete the account.
 * @throws {Error} If an unexpected error occurs during the deletion process.
 */
export const deleteAccount = async (account: IAccount): Promise<void> => {
  if (account.ownerId != OWNER_ID) {
    throw new Error("You are not authorized to delete this account");
  }
  try {
    await axios.delete(`${BASE_URL}/accounts/${account.id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to delete an account");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to delete an account");
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};
