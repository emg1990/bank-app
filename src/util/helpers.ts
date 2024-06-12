import { message } from "antd";
import { IAccount, ICurrency } from "./types";
import { ALLOWED_DECIMALS } from "../config";
import BigNumber from "bignumber.js";

/**
 * Retrieves a currency object from an array of currencies based on its code.
 * @param code - The currency code to search for.
 * @param currencies - An array of currency objects.
 * @returns The currency object with the specified code.
 * @throws If no currency object is found with the specified code.
 */
export function getCurrencyByCode(code: string, currencies: ICurrency[]) {
  const selectedCurrency = currencies.find(currency => (currency.code === code));
  if (!selectedCurrency) {
    message.error(`Currency with code ${code} not found.`);
    throw new Error(`Currency with code ${code} not found.`);
  }
  return selectedCurrency;
}

/**
 * Returns a formatted string representation of a currency based on its code.
 * @param code - The currency code.
 * @param currencies - An array of currency objects.
 * @returns A string representation of the currency in the format: "{name} - {code} - {symbol}".
 */
export function getParsedCurrencyByCode(code: string, currencies: ICurrency[]) {
  const currency = getCurrencyByCode(code, currencies);
  return `${currency.name} - ${currency.code} - ${currency.symbol}`;
}

/**
 * Converts an amount from one currency to another.
 * 
 * @param amount - The amount to be converted.
 * @param fromCurrency - The currency to convert from.
 * @param toCurrency - The currency to convert to.
 * @returns The converted amount.
 */
export function getCurrencyConvertedAmount(amount: number, fromCurrency: ICurrency, toCurrency: ICurrency) {
  // Converting first to BigNumber to avoid floating point arithmetic issues
  const bignumberAmount = new BigNumber(amount);
  const bignumberToCurrencyRate = new BigNumber(toCurrency.rate);
  const bignumberFromCurrencyRate = new BigNumber(fromCurrency.rate);
  return bignumberAmount.times(bignumberToCurrencyRate).dividedBy(bignumberFromCurrencyRate).toNumber();
}

/**
 * Calculates the balance by currency for a given array of accounts.
 * @param accounts - An array of accounts.
 * @returns An object representing the balance by currency, where the currency is the key and the balance is the value.
 */
export function getBalanceByCurrency(accounts: IAccount[]) {
  const balanceByCurrency: Record<string, number> = {};
  accounts.forEach(account => {
    if (balanceByCurrency[account.currency]) {
      balanceByCurrency[account.currency] += (account.balance || 0);
    } else {
      balanceByCurrency[account.currency] = (account.balance || 0);
    }
  });
  return balanceByCurrency;
}

/**
 * Rounds a decimal number to the specified number of decimal places.
 * @param value - The number to round.
 * @param decimals - The number of decimal places to round to. Defaults to ALLOWED_DECIMALS.
 * @returns The rounded number.
 */
export function roundDecimal(value: number, decimals = ALLOWED_DECIMALS) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Converts a given date in milliseconds to a formatted string representation.
 * The formatted string is based on the current locale and follows the 'en-GB' format.
 *
 * @param dateInMs - The date in milliseconds to be converted.
 * @returns The formatted string representation of the given date in the 'dd/MM/yyyy, HH:mm:ss' format.
 */
export function displayDateTime(dateInMs: number): string {
  return new Date(dateInMs).toLocaleString('en-GB');
}

// Regular expression for IBAN validation
export const IBAN_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/;