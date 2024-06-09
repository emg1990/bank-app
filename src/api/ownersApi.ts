import axios, { type AxiosResponse } from 'axios';
import { IOwner } from '../util/types';
import { BASE_URL, OWNER_ID } from '../config';

// Should get id in BE from session
export const getOwner = async (id: number): Promise<IOwner> => {
  try {
    const response: AxiosResponse<IOwner> = await axios.get(`${BASE_URL}/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching owner with ID ${id}`, error);
    throw error;
  }
};

// Helper function to handle what should be handled by backend when creating an account
export const addOwnerSavedAccounts = async (accountId: string): Promise<void> => {
  try {
    const owner = await getOwner(OWNER_ID);
    const savedAccounts = [...new Set([...owner.savedAccounts, accountId])];
    await axios.patch(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts });
  } catch (error) {
    console.error(`Error updating owner saved accounts with account ID ${accountId}`, error);
    throw error;
  }
}

// Helper function to handle what should be handled by backend when deleting an account
export const deleteOwnerSavedAccounts = async (accountId: string): Promise<void> => {
  try {
    const owner = await getOwner(OWNER_ID);
    await axios.patch(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: owner.savedAccounts.filter(id => id !== accountId)});
  } catch (error) {
    console.error(`Error updating owner saved accounts with account ID ${accountId}`, error);
    throw error;
  }
}
