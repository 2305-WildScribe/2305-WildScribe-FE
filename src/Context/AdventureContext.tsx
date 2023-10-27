import { createContext, useContext, useEffect, useState } from 'react';
import { Adventure } from '../../src/types';
import { fetchUserAdventures } from '../../src/apiCalls';
import { useNavigate } from 'react-router-dom';

export const AdventureContext = createContext<Adventure[] | any | null>(null);

export function AdventureContextProvider({ children }: any) {
  const navigate = useNavigate();

  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const [loading, setLoading] = useState(true);

  const [singleAdventure, setSingleAdventure] = useState<Adventure | undefined>(
    undefined
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const parsedBoolean = savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : null;
    return parsedBoolean || null;
  });

  const [userId, setUserId] = useState<string | undefined>(() => {
    const savedUserId = localStorage.getItem('UserId');
    const parsedId = savedUserId ? JSON.parse(savedUserId) : undefined;
    return parsedId || undefined;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const retrieveUserInformation = async (id: string | undefined) => {
    console.log('id in function',id)
    try {
      const data = await fetchUserAdventures(id);
      setLoading(false);
      console.log('data', data);
      setAdventures(data.data.attributes as Adventure[]);
      setError({ error: false, message: '' });
    } catch (error) {
      setIsLoggedIn(false);
      setLoading(false);
      setError({
        error: true,
        message: 'Oops, something went wrong, please try again later',
      });
      navigate('/error');
    }
  };

  const logNewAdventure = (newAdventureData: Adventure) => {
    setAdventures([...adventures, newAdventureData]);
  };

  const deleteAdventureOnDom = (adventure_id: string | undefined) => {
    const filterAdventures = adventures.filter(
      (adventure) => adventure.adventure_id !== adventure_id
    );
    setAdventures(filterAdventures);
  };

  const filteredAdventures = (keyword: any) => {
    let searchedLogs =
      adventures &&
      adventures.map((adventure) => {
        if (
          adventure.activity.toLowerCase().includes(keyword) ||
          adventure.date?.includes(keyword) ||
          adventure.sleep_stress_notes?.toLowerCase().includes(keyword) ||
          adventure.diet_hydration_notes?.toLowerCase().includes(keyword) ||
          adventure.beta_notes?.toLowerCase().includes(keyword)
        ) {
          return adventure;
        } else {
          return undefined;
        }
      });

    return searchedLogs;
  };
  const [keyword, setKeyword] = useState<string>('');

  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | []
  >([]);

  // useEffect(() => {
  //   if (keyword !== '') {
  //     setAdventures(searchedAdventures);
  //   } else {
  //     setAdventures(adventures); 
  //   }
  // }, [keyword]);


  const value = {
    keyword,
    setKeyword,
    searchedAdventures,
    setSearchedAdventures,
    adventures,
    retrieveUserInformation,
    logNewAdventure,
    deleteAdventureOnDom,
    setAdventures,
    filteredAdventures,
    setSingleAdventure,
    singleAdventure,
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setLoading,
    loading,
    setUserId,
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
