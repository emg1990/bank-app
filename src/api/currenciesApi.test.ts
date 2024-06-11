import axios from 'axios';
import { getCurrencies } from './currenciesApi';
import { BASE_URL } from '../config';

jest.mock('axios');

describe('getCurrencies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request to /currencies endpoint and return the list of currencies', async () => {
    const responseData = [
      { id: 'currency1', name: 'Currency 1' },
      { id: 'currency2', name: 'Currency 2' },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const result = await getCurrencies();

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/currencies`);
    expect(result).toEqual(responseData);
  });

  it('should handle 404 response and return an empty array', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

    const result = await getCurrencies();

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/currencies`);
    expect(result).toEqual([]);
  });

  it('should handle 401 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

    await expect(getCurrencies()).rejects.toThrow('You are not authorized to fetch currencies');

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/currencies`);
  });

  it('should handle 403 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

    await expect(getCurrencies()).rejects.toThrow('You do not have permission to fetch currencies');

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/currencies`);
  });

  it('should handle unexpected error and throw a generic error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    await expect(getCurrencies()).rejects.toThrow('Oops! Something went wrong please try again later');

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/currencies`);
  });
});