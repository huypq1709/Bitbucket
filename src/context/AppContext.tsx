import React, { useState, createContext, useContext } from 'react';
interface AppContextType {
  selectedAsset: string;
  setSelectedAsset: (asset: string) => void;
  forecastHorizon: string;
  setForecastHorizon: (horizon: string) => void;
  xaiMode: string;
  setXaiMode: (mode: string) => void;
  watchlist: string[];
  setWatchlist: (watchlist: string[]) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [selectedAsset, setSelectedAsset] = useState('TSLA');
  const [forecastHorizon, setForecastHorizon] = useState('5 phút');
  const [xaiMode, setXaiMode] = useState('DAVOTS');
  const [watchlist, setWatchlist] = useState(['TSLA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'AMD']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    selectedAsset,
    setSelectedAsset,
    forecastHorizon,
    setForecastHorizon,
    xaiMode,
    setXaiMode,
    watchlist,
    setWatchlist,
    isLoggedIn,
    setIsLoggedIn
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};