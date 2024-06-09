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