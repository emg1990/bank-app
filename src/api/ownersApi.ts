import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { IOwner } from '../util/types';
import { BASE_URL, OWNER_ID } from '../config';

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

// Helper function to handle what should be handled by backend when creating an account
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

// Helper function to handle what should be handled by backend when deleting an account
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
