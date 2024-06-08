import axios, { type AxiosResponse } from 'axios';
import { IOwner } from '../types/types';
import { BASE_URL } from '../config';

// Should get id in BE from session
export const getOwner = async (id: number): Promise<IOwner> => {
  try {
    const response: AxiosResponse<IOwner> = await axios.get(`${BASE_URL}/owners/${id}`);
    console.log('owner lala', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching owner with ID ${id}`, error);
    throw error;
  }
};
