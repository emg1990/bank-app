import axios from 'axios';
import { getOwner, addOwnerSavedAccounts, deleteOwnerSavedAccounts } from './ownersApi';
import { BASE_URL, OWNER_ID } from '../config';

jest.mock('axios');

describe('getOwner', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request to /owners/{OWNER_ID} endpoint and return the owner information', async () => {
    const responseData = { id: 'owner1', name: 'John Doe' };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const result = await getOwner();

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(result).toEqual(responseData);
  });

  it('should handle 404 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

    await expect(getOwner()).rejects.toThrow('Could not find owner information');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
  });

  it('should handle 401 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

    await expect(getOwner()).rejects.toThrow('You are not authorized to fetch owner information');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
  });

  it('should handle 403 response and throw an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

    await expect(getOwner()).rejects.toThrow('You do not have permission to fetch owner information');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
  });

  it('should handle unexpected error and throw a generic error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    await expect(getOwner()).rejects.toThrow('Oops! Something went wrong please try again later');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
  });
});

describe('addOwnerSavedAccounts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a PATCH request to /owners/{OWNER_ID} endpoint and add the account to the owner', async () => {
    const owner = { id: 'owner1', name: 'John Doe', savedAccounts: ['account1'] };
    (axios.patch as jest.Mock).mockResolvedValueOnce({});

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: owner });

    const accountId = 'account2';
    await addOwnerSavedAccounts(accountId);

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: ['account1', 'account2'] });
  });

  it('should handle 401 response and throw an error', async () => {
    (axios.patch as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { id: 'owner1', name: 'John Doe', savedAccounts: [] } });

    const accountId = 'account1';
    await expect(addOwnerSavedAccounts(accountId)).rejects.toThrow('You are not authorized to add the account to the owner');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: ['account1'] });
  });

  it('should handle 403 response and throw an error', async () => {
    (axios.patch as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { id: 'owner1', name: 'John Doe', savedAccounts: [] } });

    const accountId = 'account1';
    await expect(addOwnerSavedAccounts(accountId)).rejects.toThrow('You do not have permission to add the account to the owner');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: ['account1'] });
  });

  it('should handle unexpected error and throw a generic error', async () => {
    (axios.patch as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { id: 'owner1', name: 'John Doe', savedAccounts: [] } });

    const accountId = 'account1';
    await expect(addOwnerSavedAccounts(accountId)).rejects.toThrow('Oops! Something went wrong please try again later');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: ['account1'] });
  });
});

describe('deleteOwnerSavedAccounts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a PATCH request to /owners/{OWNER_ID} endpoint and remove the account from the owner', async () => {
    const owner = { id: 'owner1', name: 'John Doe', savedAccounts: ['account1', 'account2'] };
    (axios.patch as jest.Mock).mockResolvedValueOnce({});

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: owner });

    const accountId = 'account2';
    await deleteOwnerSavedAccounts(accountId);

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: ['account1'] });
  });

  it('should handle 401 response and throw an error', async () => {
    (axios.patch as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { id: 'owner1', name: 'John Doe', savedAccounts: ['account1'] } });

    const accountId = 'account1';
    await expect(deleteOwnerSavedAccounts(accountId)).rejects.toThrow('You are not authorized to remove the account from the owner');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: [] });
  });

  it('should handle 403 response and throw an error', async () => {
    (axios.patch as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { id: 'owner1', name: 'John Doe', savedAccounts: ['account1'] } });

    const accountId = 'account1';
    await expect(deleteOwnerSavedAccounts(accountId)).rejects.toThrow('You do not have permission to remove the account from the owner');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: [] });
  });

  it('should handle unexpected error and throw a generic error', async () => {
    (axios.patch as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { id: 'owner1', name: 'John Doe', savedAccounts: ['account1'] } });

    const accountId = 'account1';
    await expect(deleteOwnerSavedAccounts(accountId)).rejects.toThrow('Oops! Something went wrong please try again later');
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    expect(axios.patch).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`, { savedAccounts: [] });
  });
});