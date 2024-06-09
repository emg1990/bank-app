import React, { createContext, useContext, useEffect, useState } from "react";
import { ICurrency, IOwner } from "../util/types";
import { getCurrencies } from "../api/currenciesApi";
import { message } from "antd";
import { getOwner } from "../api/ownersApi";

// Define interface for context
interface IAppContext {
  owner: IOwner;
  currencies: ICurrency[];
  updateOwnerSavedAccounts: (savedAccounts: string[]) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [owner, setOwner] = useState<IOwner>({} as IOwner);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch currencies and owners from API or any other source
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await getCurrencies();
        setCurrencies(currencies);
      } catch (error) {
        // TODO retry if some type of managable error
        message.error('Failed to fetch currencies');
        console.error('Failed to fetch currencies:', error);
      }
    };
    const fetchOwner = async () => {
      try {
        // TODO get owner from login
        const owner = await getOwner(1);
        setOwner(owner);
      } catch (error) {
        // TODO retry if some type of managable error
        message.error('Failed to fetch owner details');
        console.error('Failed to fetch owner details:', error);
      }
    };
    Promise.all([fetchCurrencies(), fetchOwner()])
    .then(() => {
      setLoading(false);
    });
  }, []);

  const updateOwnerSavedAccounts = (savedAccounts: string[]) => {
    setOwner({ ...owner, savedAccounts });
  };

  return (
    <AppContext.Provider value={{ currencies, owner, updateOwnerSavedAccounts }}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};