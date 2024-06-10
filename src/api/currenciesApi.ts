import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { ICurrency } from '../util/types';
import { BASE_URL } from '../config';

// Currencies Endpoints
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
      }
    }
    throw new Error("Oops! Something went wrong please try again later");
  }
};