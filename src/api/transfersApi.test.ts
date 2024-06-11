import axios from 'axios';
import { getTransfers, createTransfer } from './transfersApi';
import { BASE_URL } from '../config';
import { getAccountById, updateAccount } from './accountsApi';
import { getCurrencies } from './currenciesApi';
import { ITransfer } from '../util/types';

jest.mock('axios');
jest.mock('./accountsApi');
jest.mock('./currenciesApi');

describe('getTransfers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request to /transfers endpoint and return the transfers', async () => {
    const responseData = [{ id: 'transfer1', amount: 100 }, { id: 'transfer2', amount: 200 }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const result = await getTransfers();

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/transfers`);
    expect(result).toEqual(responseData.reverse());
  });

  it('should handle 404 response and return an empty array', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

    const result = await getTransfers();

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/transfers`);
    expect(result).toEqual([]);
  });

  it('should handle 401 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

    await expect(getTransfers()).rejects.toThrow('You are not authorized to fetch transfers');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/transfers`);
  });

  it('should handle 403 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

    await expect(getTransfers()).rejects.toThrow('You do not have permission to fetch transfers');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/transfers`);
  });

  it('should handle unexpected error and throw a generic error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    await expect(getTransfers()).rejects.toThrow('Oops! Something went wrong please try again later');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/transfers`);
  });
});

describe('createTransfer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a POST request to /transfers endpoint and create a new transfer', async () => {
    const transfer = { fromAccount: 'account1', toAccount: 'account2', amount: 100, currency: 'USD', date: new Date().getTime() };
    const responseData = { id: 'transfer1', ...transfer };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const fromAccount = { id: 'account1', balance: 500, currency: 'USD' };
    const toAccount = { id: 'account2', balance: 200, currency: 'EUR' };
    (getAccountById as jest.Mock).mockResolvedValueOnce(fromAccount);
    (getAccountById as jest.Mock).mockResolvedValueOnce(toAccount);

    const currencies = [{ code: 'USD', rate: 1 }, { code: 'EUR', rate: 0.9 }];
    (getCurrencies as jest.Mock).mockResolvedValueOnce(currencies);

    await createTransfer(transfer);

    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/transfers`, { ...transfer, id: expect.any(Number) });
    expect(getAccountById).toHaveBeenCalledWith('account1');
    expect(getAccountById).toHaveBeenCalledWith('account2');
    expect(getCurrencies).toHaveBeenCalled();
    expect(updateAccount).toHaveBeenCalledWith({ ...fromAccount, balance: 400 });
    expect(updateAccount).toHaveBeenCalledWith({ ...toAccount, balance: 290 });
  });

  it('should handle 401 response and throw an error', async () => {
    const transfer = { fromAccount: 'account1', toAccount: 'account2', amount: 100, currency: 'USD', date: new Date().getTime()};
    (axios.post as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

    await expect(createTransfer(transfer)).rejects.toThrow('You are not authorized to create transfers');
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/transfers`, { ...transfer, id: expect.any(Number) });
  });

  it('should handle 403 response and throw an error', async () => {
    const transfer = { fromAccount: 'account1', toAccount: 'account2', amount: 100, currency: 'USD', date: new Date().getTime() };
    (axios.post as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

    await expect(createTransfer(transfer)).rejects.toThrow('You do not have permission to create transfers');
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/transfers`, { ...transfer, id: expect.any(Number) });
  });

  it('should handle unexpected error and throw a generic error', async () => {
    const transfer = { fromAccount: 'account1', toAccount: 'account2', amount: 100, currency: 'USD', date: new Date().getTime() };
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    await expect(createTransfer(transfer)).rejects.toThrow('Oops! Something went wrong please try again later');
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/transfers`, { ...transfer, id: expect.any(Number) });
  });
});