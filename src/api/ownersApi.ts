import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { IOwner } from '../util/types';
import { BASE_URL, OWNER_ID } from '../config';

/**
 * Retrieves owner information from the server.
 * @returns A Promise that resolves to an `IOwner` object representing the owner information.
 * @throws An error if the owner information cannot be found, the owner is not authorized, or if there is an unexpected error.
 */
export const getOwner = async (): Promise<IOwner> => {
  try {
    // Should get id in BE from session
    const response: AxiosResponse<IOwner> = await axios.get(`${BASE_URL}/owners/${OWNER_ID}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        throw new Error("Could not find owner information");
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to fetch owner information");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to fetch owner information");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};

/**
 * Adds the specified account to the saved accounts of the owner.
 * 
 * Helper function to handle what should be handled by backend when creating an account
 * 
 * @param accountId - The ID of the account to be added.
 * @returns A Promise that resolves to void.
 * @throws Error - If the owner is not authorized to add the account to the owner or if an error occurs.
 */
export const addOwnerSavedAccounts = async (accountId: string): Promise<void> => {
  try {
    const owner = await getOwner();
    const savedAccounts = [...new Set([...owner.savedAccounts, accountId])];
    await axios.patch(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to add the account to the owner");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to add the account to the owner");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
}

/**
 * Deletes a saved account from the owner's list of saved accounts.
 * 
 * Helper function to handle what should be handled by backend when deleting an account
 * 
 * @param accountId - The ID of the account to be removed.
 * @returns A Promise that resolves to void.
 * @throws Error if there is an error deleting the account or if the owner is not authorized or does not have permission.
 */
export const deleteOwnerSavedAccounts = async (accountId: string): Promise<void> => {
  try {
    const owner = await getOwner();
    await axios.patch(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: owner.savedAccounts.filter(id => id !== accountId)});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to remove the account from the owner");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to remove the account from the owner");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
}
