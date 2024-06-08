import axios, { type AxiosResponse } from 'axios';
import { ITransfer } from '../components/types';
import { BASE_URL } from '../config';

// Transfers Endpoints
export const getTransfers = async (): Promise<ITransfer[]> => {
  try {
    const response: AxiosResponse<ITransfer[]> = await axios.get(`${BASE_URL}/transfers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transfers", error);
    throw error;
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

export const createTransfer = async (transfer: ITransfer): Promise<ITransfer> => {
  try {
    const response: AxiosResponse<ITransfer> = await axios.post(`${BASE_URL}/transfers`, transfer);
    return response.data;
  } catch (error) {
    console.error("Error creating transfer", error);
    throw error;
  }
};
