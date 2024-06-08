import { useState, useEffect } from 'react';
import { getCurrencies } from '../api/currenciesApi';
import { ICurrency } from '../components/types';

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await getCurrencies();
        setCurrencies(currencies);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };

    if (currencies.length === 0) {
      fetchCurrencies();
    }
  }, [currencies]);

  return currencies;
};

export default useCurrencies;