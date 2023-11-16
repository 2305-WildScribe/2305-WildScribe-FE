import { createContext, useContext, useState } from 'react';
import { Adventure } from '../../src/types';

export const AdventureContext = createContext<Adventure[] | any | null>(null);

export function AdventureContextProvider({ children }: any) {

  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const [loading, setLoading] = useState(true);

  const [singleAdventure, setSingleAdventure] = useState<Adventure | undefined>(
    undefined
  );




  const value = {
    setSingleAdventure,
    singleAdventure,
    setLoading,
    loading,
    setError,
    error,
  };

  return (
    <AdventureContext.Provider value={value}>
      {children}
    </AdventureContext.Provider>
  );
}

export function useAdventures() {
  const adventures = useContext(AdventureContext);
  if (!adventures) {
    throw new Error(
      'useAdventures must be used within AdventureContextProvider.'
    );
  }
  return adventures;
}
