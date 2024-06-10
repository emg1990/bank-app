import React, { createContext, useContext, useEffect, useState } from "react";
import { ICurrency, IOwner } from "../util/types";
import { getCurrencies } from "../api/currenciesApi";
import { message } from "antd";
import { getOwner } from "../api/ownersApi";
import Loader from "../components/Loader/Loader";

// Define interface for context
interface IAppContext {
  owner: IOwner;
  currencies: ICurrency[];
  myAccountsLastUpdate: number;
  transfersLastUpdate: number;
  updateOwnerSavedAccounts: (savedAccounts: string[]) => void;
  setMyAccountsLastUpdate: (timestamp: number) => void;
  setTransfersLastUpdate: (timestamp: number) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [owner, setOwner] = useState<IOwner>({} as IOwner);
  const [loading, setLoading] = useState<boolean>(true);
  const [myAccountsLastUpdate, setMyAccountsLastUpdate] = useState<number>(new Date().getTime());
  const [transfersLastUpdate, setTransfersLastUpdate] = useState<number>(new Date().getTime());

  // Fetch currencies and owners from API or any other source
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await getCurrencies();
        setCurrencies(currencies);
      } catch (error) {
        console.warn("Error fetching currencies", error);
        // TODO retry if some type of managable error
        message.error((error as Error).message);
      }
    };
    const fetchOwner = async () => {
      try {
        const owner = await getOwner();
        setOwner(owner);
      } catch (error) {
        console.warn("Error fetching owner", error);
        // TODO retry if some type of managable error
        message.error((error as Error).message);
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
    <AppContext.Provider value={{
      currencies,
      owner,
      myAccountsLastUpdate,
      transfersLastUpdate,
      setMyAccountsLastUpdate,
      setTransfersLastUpdate,
      updateOwnerSavedAccounts
    }}>
      {loading ? <Loader /> : children}
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