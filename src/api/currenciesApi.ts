import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { ICurrency } from '../util/types';
import { BASE_URL } from '../config';

// Currencies Endpoints
/**
 * Retrieves a list of currencies from the server.
 * @returns A promise that resolves to an array of ICurrency objects.
 * @throws Error if there is an error fetching the currencies or if the owner is not authorized or does not have permission.
 */
export const getCurrencies = async (): Promise<ICurrency[]> => {
  try {
    const response: AxiosResponse<ICurrency[]> = await axios.get(`${BASE_URL}/currencies`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 404) {
        return [];
      } else if (axiosError.response?.status === 401) {
        // Should redirect to login page
        throw new Error("You are not authorized to fetch currencies");
      } else if (axiosError.response?.status === 403) {
        throw new Error("You do not have permission to fetch currencies");
      } else if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Our server is currently offline. Please try again later.");
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};