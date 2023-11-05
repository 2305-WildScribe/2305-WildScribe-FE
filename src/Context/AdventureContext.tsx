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

  const [keyword, setKeyword] = useState<string>('');

  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | undefined
  >([]);

  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const retrieveUserInformation = async (id: string | undefined) => {
    // console.log('id in function', id);
    try {
      const data = await fetchUserAdventures(id);
      setLoading(false);
      // console.log('data', data);
      setAdventures(data.data.attributes as Adventure[]);
      setSearchedAdventures(adventures);

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
    setSearchedAdventures(filterAdventures);
    setAdventures(filterAdventures);
  };

  const filteredAdventures = (keyword: any) => {
    console.log('keyword in filtered funciton', keyword);
    let searchedLogs =
      adventures &&
      adventures.filter((adventure) => {
        if (
          adventure.activity.toLowerCase().includes(keyword) ||
          adventure.date?.includes(keyword) ||
          adventure.sleep_stress_notes?.toLowerCase().includes(keyword) ||
          adventure.diet_hydration_notes?.toLowerCase().includes(keyword) ||
          adventure.beta_notes?.toLowerCase().includes(keyword)
        ) {
          return adventure;
        } else {
          return;
        }
      });
    return searchedLogs;
  };

  const handleSearch = (keyword: string) => {
    console.log('keyword in handleSearch', keyword);
    let results = filteredAdventures(keyword) || [];
    // let filteredResults: (Adventure | undefined)[];
    // filteredResults = results.filter((adventure) => adventure !== undefined);
    setSearchedAdventures([...results] as Adventure[]);
    setFilter(true);
  };

  useEffect(() => {
    retrieveUserInformation(userId);
  }, []);

  useEffect(() => {
    console.log('keyword', keyword);
    // setSearchedAdventures(searchedAdventures);
  }, [keyword]);

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
    setFilter,
    filter,
    handleSearch,
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
