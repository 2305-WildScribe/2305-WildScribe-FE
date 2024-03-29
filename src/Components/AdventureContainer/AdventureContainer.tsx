import './AdventureContainer.scss';
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  selectAdventures,
  setSingleLog,
} from '../../Redux/slices/adventuresSlice';
import { RefObject, useEffect, useRef, useState } from 'react';
import Map from '../Map/Map';
import StatsPage from '../StatsPage/StatsPage';

function AdventureContainer(): React.ReactElement {
  const dispatch = useAppDispatch();
  let adventures = useAppSelector(selectAdventures).adventures;
  const navigate = useNavigate();
  const activity = useParams().activity;
  const [keyword, setKeyword] = useState<string>('');
  const [viewStats, setViewStats] = useState<boolean>(false);
  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | []
  >([]);

  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  useEffect(() => {
    setSearchedAdventures(sortByDateAscending());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adventures]);

  const searchAdventures = (keyword: string) => {
    return (
      sortByDateAscending() &&
      sortByDateAscending().filter((adventure) => {
        return (
          adventure.activity.toLowerCase().includes(keyword) ||
          adventure.date?.includes(keyword) ||
          adventure.sleep_stress_notes?.toLowerCase().includes(keyword) ||
          adventure.diet_hydration_notes?.toLowerCase().includes(keyword) ||
          adventure.beta_notes?.toLowerCase().includes(keyword)
        );
      })
    );
  };

  const handleSearch = (keyword: string) => {
    let results = searchAdventures(keyword) || [];
    setSearchedAdventures([...results] as Adventure[]);
  };

  const filterAdventures = () => {
    let filtered = adventures?.filter(
      (adventure) => adventure.activity === activity
    );
    return filtered;
  };

  function sortByDateAscending() {
    return filterAdventures()
      ?.slice()
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }

  const handleNewLog = () => {
    navigate(`/${activity}/newLog`);
  };

  const handleViewStats = () => {
    setViewStats(true);
  };

  type MapMethods = {
    flyTo: (coordinates: [number, number], zoom: number) => void;
    openPopup: () => void
  };

  const mapRef: RefObject<MapMethods> = useRef<MapMethods>(null as any);

  const zoomToLog = (
    coordinates: { lat: number; lng: number },
    adventureId: string
  ) => {
    if (mapRef.current !== null) {
      const { lat, lng } = coordinates;
      mapRef.current?.flyTo([lat, lng], 15);
      dispatch(setSingleLog(adventureId));
    }
  };

  const adventureCards = searchedAdventures?.map((adventure) => {
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard
          adventure={adventure}
          setSelectedLog={setSelectedLog}
          selectedLog={selectedLog}
          zoomToLog={zoomToLog}
        />
      </div>
    );
  });

  return (
    <>
      {viewStats ? (
        <StatsPage setViewStats={setViewStats} activity={activity} />
      ) : (
        <>
          <div className='search-bar-wrapper'>
            <p>{activity} Journal</p>
            <button className='new-adventure-btn' onClick={handleNewLog}>
              {`Add Log`}
            </button>
            <button className='view-stats-btn' onClick={handleViewStats}>
              {' '}
              {`View Stats`}
            </button>
            <input
              className='search-input'
              type='text'
              placeholder='Search logs here'
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
          <div className='map-card-wrapper'>
            <div className='adventure-card-container'>
              {sortByDateAscending()?.length ? (
                adventureCards
              ) : (
                <p>{`It looks like you don't have any ${activity?.toLowerCase()} logs yet, go ahead and add a log to get started!  `}</p>
              )}
              {searchedAdventures?.length === 0 &&
                sortByDateAscending()?.length > 0 && (
                  <p className='no-results-msg'>
                    Sorry, we couldn't find anything that matched. Please try
                    again.
                  </p>
                )}
            </div>
            <Map activity={activity} zoomToLog={zoomToLog} mapRef={mapRef} />
          </div>
        </>
      )}
    </>
  );
}

export default AdventureContainer;
