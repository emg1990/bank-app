import axios, { type AxiosResponse } from 'axios';
import { IOwner } from '../components/types';
import { BASE_URL } from '../config';

// Owners Endpoints
export const getOwners = async (): Promise<IOwner[]> => {
  try {
    const response: AxiosResponse<IOwner[]> = await axios.get(`${BASE_URL}/owners`);
    return response.data;
  } catch (error) {
    console.error("Error fetching owners", error);
    throw error;
  }
};

export const getOwnerById = async (id: number): Promise<IOwner> => {
  try {
    const response: AxiosResponse<IOwner> = await axios.get(`${BASE_URL}/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching owner with ID ${id}`, error);
    throw error;
  }
};
