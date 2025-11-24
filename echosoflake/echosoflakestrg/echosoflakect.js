import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [savedEchoesLakeLocations, setSavedEchoesLakeLocations] = useState([]);

  const value = {
    savedEchoesLakeLocations,
    setSavedEchoesLakeLocations,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
