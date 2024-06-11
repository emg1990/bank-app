import { getCurrencyByCode, getParsedCurrencyByCode, getCurrencyConvertedAmount, roundDecimal, displayDateTime } from "./helpers";

describe("getCurrencyByCode", () => {
  const currencies = [
    { code: "USD", name: "United States Dollar", symbol: "$", rate: 1 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
    { code: "GBP", name: "British Pound", symbol: "£", rate: 0.72 },
  ];

  it("should return the currency object with the specified code", () => {
    const result = getCurrencyByCode("EUR", currencies);
    expect(result).toEqual({ code: "EUR", name: "Euro", symbol: "€", rate: 0.85 });
  });

  it("should throw an error if no currency object is found with the specified code", () => {
    expect(() => getCurrencyByCode("JPY", currencies)).toThrowError("Currency with code JPY not found.");
  });
});

describe("getParsedCurrencyByCode", () => {
  const currencies = [
    { code: "USD", name: "United States Dollar", symbol: "$", rate: 1 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
    { code: "GBP", name: "British Pound", symbol: "£", rate: 0.72 },
  ];

  it("should return a formatted string representation of the currency", () => {
    const result = getParsedCurrencyByCode("GBP", currencies);
    expect(result).toBe("British Pound - GBP - £");
  });

  it("should return a formatted string representation for a different currency", () => {
    const result = getParsedCurrencyByCode("USD", currencies);
    expect(result).toBe("United States Dollar - USD - $");
  });

  it("should return a formatted string representation for a currency with a different symbol", () => {
    const result = getParsedCurrencyByCode("EUR", currencies);
    expect(result).toBe("Euro - EUR - €");
  });

  it("should throw an error if no currency object is found with the specified code", () => {
    expect(() => getParsedCurrencyByCode("JPY", currencies)).toThrowError("Currency with code JPY not found.");
  });
});

describe("getCurrencyConvertedAmount", () => {
  const currencies = [
    { code: "USD", name: "United States Dollar", symbol: "$", rate: 1 },
    { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
    { code: "GBP", name: "British Pound", symbol: "£", rate: 0.72 },
  ];

  it("should convert the amount from one currency to another", () => {
    const fromCurrency = currencies[0];
    const toCurrency = currencies[1];
    const result = getCurrencyConvertedAmount(100, fromCurrency, toCurrency);
    expect(result).toBe(85);
  });

  it("should handle zero amount correctly", () => {
    const fromCurrency = currencies[0];
    const toCurrency = currencies[1];
    const result = getCurrencyConvertedAmount(0, fromCurrency, toCurrency);
    expect(result).toBe(0);
  });

  it("should handle large amounts correctly", () => {
    const fromCurrency = currencies[0]
    const toCurrency = currencies[1];
    const result = getCurrencyConvertedAmount(1000000, fromCurrency, toCurrency);
    expect(result).toBe(850000);
  });

  it("should handle currencies with different rates", () => {
    const fromCurrency = currencies[2];
    const toCurrency = currencies[1];
    const result = getCurrencyConvertedAmount(100, fromCurrency, toCurrency);
    expect(result).toBe(118.05555555555556);
  });

  it("should handle same currency conversion", () => {
    const fromCurrency = currencies[0];
    const toCurrency = currencies[0];
    const result = getCurrencyConvertedAmount(100, fromCurrency, toCurrency);
    expect(result).toBe(100);
  });
});

describe("roundDecimal", () => {
  it("should round a decimal number to the specified number of decimal places", () => {
    const result = roundDecimal(3.14159, 2);
    expect(result).toBe(3.14);
  });

  it("should round a decimal number to the default number of decimal places", () => {
    const result = roundDecimal(3.14159);
    expect(result).toBe(3.14); // Assuming ALLOWED_DECIMALS is 2
  });

  it("should round a decimal number up when the next digit is 5 or greater", () => {
    const result = roundDecimal(3.145, 2);
    expect(result).toBe(3.15);
  });

  it("should round a decimal number down when the next digit is less than 5", () => {
    const result = roundDecimal(3.144, 2);
    expect(result).toBe(3.14);
  });

  it("should round a decimal number with more decimal places than specified", () => {
    const result = roundDecimal(3.14159265359, 5);
    expect(result).toBe(3.14159);
  });

  it("should round a decimal number with less decimal places than specified", () => {
    const result = roundDecimal(3.14, 5);
    expect(result).toBe(3.14);
  });
});

describe("displayDateTime", () => {
  it("should convert a given date in milliseconds to a formatted string representation", () => {
    const result = displayDateTime(1631234567890);
    expect(result).toBe("10/09/2021, 02:42:47"); // Assuming 'en-GB' format
  });
});