import axios, { type AxiosResponse } from 'axios';
import { ICurrency } from '../components/types';
import { BASE_URL } from '../config';

// Currencies Endpoints
export const getCurrencies = async (): Promise<ICurrency[]> => {
  try {
    const response: AxiosResponse<ICurrency[]> = await axios.get(`${BASE_URL}/currencies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching currencies", error);
    throw error;
  }
};