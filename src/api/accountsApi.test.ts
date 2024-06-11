import mockAxios from 'axios';
import {
  getAccounts,
  getMyAccounts,
  getAccountById,
  getValidatedAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} from './accountsApi';
import * as ownersApi from './ownersApi';
import { BASE_URL, OWNER_ID } from '../config';
import { IAccount } from '../util/types';



describe('accountsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccounts', () => {
    it('should make a GET request to /accounts endpoint and return filtered accounts', async () => {
      const savedAccounts = ['account1', 'account2'];
      const responseData = [
        { id: 'account1', name: 'Account 1' },
        { id: 'account2', name: 'Account 2' },
        { id: 'account3', name: 'Account 3' },
      ];
      const expectedResponse = [
        { id: 'account1', name: 'Account 1' },
        { id: 'account2', name: 'Account 2' },
      ];
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

      const result = await getAccounts(savedAccounts);

      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts`);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle 404 response and return an empty array', async () => {
      const savedAccounts = ['account1', 'account2'];
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

      const result = await getAccounts(savedAccounts);

      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts`);
      expect(result).toEqual([]);
    });

    it('should handle 401 response and throw an error', async () => {
      const savedAccounts = ['account1', 'account2'];
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

      await expect(getAccounts(savedAccounts)).rejects.toThrow('You are not authorized to fetch accounts');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts`);
    });

    it('should handle 403 response and throw an error', async () => {
      const savedAccounts = ['account1', 'account2'];
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

      await expect(getAccounts(savedAccounts)).rejects.toThrow('You do not have permission to fetch accounts');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts`);
    });

    it('should handle unexpected error and throw a generic error', async () => {
      const savedAccounts = ['account1', 'account2'];
      (mockAxios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(getAccounts(savedAccounts)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts`);
    });
  });

  describe('getMyAccounts', () => {
    it('should make a GET request to /accounts endpoint with ownerId and return accounts', async () => {
      const responseData = [
        { id: 'account1', name: 'Account 1' },
        { id: 'account2', name: 'Account 2' },
      ];
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

      const result = await getMyAccounts();

      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts?ownerId=${OWNER_ID}`);
      expect(result).toEqual(responseData);
    });

    it('should handle 404 response and return an empty array', async () => {
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

      const result = await getMyAccounts();

      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts?ownerId=${OWNER_ID}`);
      expect(result).toEqual([]);
    });

    it('should handle 401 response and throw an error', async () => {
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

      await expect(getMyAccounts()).rejects.toThrow('You are not authorized to fetch accounts');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts?ownerId=${OWNER_ID}`);
    });

    it('should handle 403 response and throw an error', async () => {
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

      await expect(getMyAccounts()).rejects.toThrow('You do not have permission to fetch accounts');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts?ownerId=${OWNER_ID}`);
    });

    it('should handle unexpected error and throw a generic error', async () => {
      (mockAxios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(getMyAccounts()).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts?ownerId=${OWNER_ID}`);
    });
  });

  describe('getAccountById', () => {
    it('should make a GET request to /accounts/{id} endpoint and return the account', async () => {
      const accountId = 'account1';
      const responseData = { id: 'account1', name: 'Account 1' };
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

      const result = await getAccountById(accountId);

      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
      expect(result).toEqual(responseData);
    });

    it('should handle 404 response and throw an error', async () => {
      const accountId = 'account1';
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

      await expect(getAccountById(accountId)).rejects.toThrow(`Account with ID ${accountId} was not found`);
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
    });

    it('should handle 401 response and throw an error', async () => {
      const accountId = 'account1';
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

      await expect(getAccountById(accountId)).rejects.toThrow('You are not authorized to access this account');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
    });

    it('should handle 403 response and throw an error', async () => {
      const accountId = 'account1';
      (mockAxios.get as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

      await expect(getAccountById(accountId)).rejects.toThrow('You do not have permission to access this account');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
    });

    it('should handle unexpected error and throw a generic error', async () => {
      const accountId = 'account1';
      (mockAxios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(getAccountById(accountId)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
    });
  });

  describe('getValidatedAccount', () => {
    it('should call getAccountById and getOwner functions and return the account if it is validated', async () => {
      const accountId = 'account1';
      const accountData = { id: 'account1', name: 'Account 1', ownerId: 'owner1' };
      const ownerData = { id: 'owner1', savedAccounts: ['account2'] };
      (mockAxios.get as jest.Mock)
        .mockResolvedValueOnce({ data: accountData })
        .mockResolvedValueOnce({ data: ownerData });

      const result = await getValidatedAccount(accountId);

      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
      expect(result).toEqual(accountData);
    });

    it('should throw an error if the account is already added', async () => {
      const accountId = 'account1';
      const accountData = { id: 'account1', name: 'Account 1', ownerId: 'owner1' };
      const ownerData = { id: 'owner1', savedAccounts: ['account1'] };
      (mockAxios.get as jest.Mock)
        .mockResolvedValueOnce({ data: accountData })
        .mockResolvedValueOnce({ data: ownerData });

      await expect(getValidatedAccount(accountId)).rejects.toThrow('This account was already added.');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    });

    it('should throw an error if getAccountById throws an error', async () => {
      const accountId = 'account1';
      (mockAxios.get as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(getValidatedAccount(accountId)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    });

    it('should throw an error if getOwner throws an error', async () => {
      const accountId = 'account1';
      const accountData = { id: 'account1', name: 'Account 1', ownerId: 'owner1' };
      (mockAxios.get as jest.Mock)
        .mockResolvedValueOnce({ data: accountData })
        .mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(getValidatedAccount(accountId)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountId}`);
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    });
  });

  describe('createAccount', () => {
    it('should make a PUT request to /accounts/{id} endpoint and return the created account', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockResolvedValueOnce({ data: accountData });
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: { id: 'owner1', savedAccounts: [] } });
      jest.spyOn(ownersApi, 'addOwnerSavedAccounts');
      jest.mocked(ownersApi.addOwnerSavedAccounts).mockImplementation(async (accountId: string) => {
        return;
      });

      const result = await createAccount(accountData);

      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
      expect(result).toEqual(accountData);
    });

    it('should throw an error if the user is not authorized', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

      await expect(createAccount(accountData)).rejects.toThrow('You are not authorized to create an account');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    });

    it('should throw an error if the user does not have permission', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

      await expect(createAccount(accountData)).rejects.toThrow('You do not have permission to create an account');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    });

    it('should throw a generic error for unexpected errors', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(createAccount(accountData)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners/${OWNER_ID}`);
    });
  });

  describe('updateAccount', () => {
    it('should make a PUT request to /accounts/{id} endpoint and return the updated account', async () => {
      const accountData = { id: 'account1', name: 'Updated Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockResolvedValueOnce({ data: accountData });

      const result = await updateAccount(accountData);

      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
      expect(result).toEqual(accountData);
    });

    it('should throw an error if the user is not authorized', async () => {
      const accountData = { id: 'account1', name: 'Updated Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

      await expect(updateAccount(accountData)).rejects.toThrow('You are not authorized to update an account');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
    });

    it('should throw an error if the user does not have permission', async () => {
      const accountData = { id: 'account1', name: 'Updated Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

      await expect(updateAccount(accountData)).rejects.toThrow('You do not have permission to update an account');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
    });

    it('should throw a generic error for unexpected errors', async () => {
      const accountData = { id: 'account1', name: 'Updated Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(updateAccount(accountData)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, accountData);
    });
  });

  describe('deleteAccount', () => {
    it('should make a PUT request to /accounts/{id} endpoint with an empty name and delete the account', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockResolvedValueOnce({});
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: { id: 'owner1', savedAccounts: ['account1'] } });
      
      jest.spyOn(ownersApi, 'deleteOwnerSavedAccounts');
      jest.mocked(ownersApi.deleteOwnerSavedAccounts).mockImplementation(async (accountId: string) => {
        return;
      });

      await deleteAccount(accountData);

      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, { ...accountData, name: '' });
    });

    it('should throw an error if the user is not authorized', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce({ response: { status: 401 } });

      await expect(deleteAccount(accountData)).rejects.toThrow('You are not authorized to delete an account');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, { ...accountData, name: '' });
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners`);
    });

    it('should throw an error if the user does not have permission', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce({ response: { status: 403 } });

      await expect(deleteAccount(accountData)).rejects.toThrow('You do not have permission to delete an account');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, { ...accountData, name: '' });
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners`);
    });

    it('should throw a generic error for unexpected errors', async () => {
      const accountData = { id: 'account1', name: 'Account 1' } as IAccount;
      (mockAxios.put as jest.Mock).mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(deleteAccount(accountData)).rejects.toThrow('Oops! Something went wrong please try again later');
      expect(mockAxios.put).toHaveBeenCalledWith(`${BASE_URL}/accounts/${accountData.id}`, { ...accountData, name: '' });
      expect(mockAxios.get).not.toHaveBeenCalledWith(`${BASE_URL}/owners`);
    });
  });
});