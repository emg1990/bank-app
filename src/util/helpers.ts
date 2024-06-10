import { message } from "antd";
import { ICurrency } from "./types";

export function getCurrencyByCode(code: string, currencies: ICurrency[]) {
  const selectedCurrency = currencies.find(currency => (currency.code === code));
  if (!selectedCurrency) {
    message.error(`Currency with code ${code} not found.`);
    throw new Error(`Currency with code ${code} not found.`);
  }
  return selectedCurrency;
}

export function getParsedCurrencyByCode(code: string, currencies: ICurrency[]) {
  const currency = getCurrencyByCode(code, currencies);
  return `${currency.name} - ${currency.code} - ${currency.symbol}`;
}

export function getCurrencyConvertedAmount(amount: number, fromCurrency: ICurrency, toCurrency: ICurrency) {
  return amount * toCurrency.rate / fromCurrency.rate;
}

export function roundDecimal(value: number, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
