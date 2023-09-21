
import React, { createContext, useContext } from 'react';
import TvDataService from '../services/TvDataService';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const tvDataService = new TvDataService();

  return (
    <DataContext.Provider value={tvDataService}>
      {children}
    </DataContext.Provider>
  );
};
