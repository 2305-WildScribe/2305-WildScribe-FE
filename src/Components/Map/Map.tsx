import { RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  selectAdventures,
  setSingleLog,
} from '../../Redux/slices/adventuresSlice';
import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import dayjs from 'dayjs';

type MapMethods = {
  flyTo: (coordinates: [number, number], zoom: number) => void;
};

interface MapProps {
  activity: string | undefined;
  zoomToLog: (
    coordinates: {
      lat: number;
      lng: number;
    },
    adventureId: string
  ) => void;
  mapRef: RefObject<MapMethods>;
  // setSelectedLog: React.Dispatch<React.SetStateAction<string | null>>
}

function Map({ activity, zoomToLog, mapRef }: MapProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const defaultZoomLevel = 4;
  let adventures = useAppSelector(selectAdventures).adventures;

  const validAdventures = adventures.filter(
    (adventure) =>
      adventure.lat && adventure.lon && adventure.activity === activity
  );

  const displayAssociatedCard = (key: string) => {
    dispatch(setSingleLog(key));
  };

  const mapPoints = validAdventures.map((adventure) => {
    if (
      adventure.lat !== undefined &&
      adventure.lon !== undefined &&
      adventure.adventure_id !== undefined
    ) {
      let correctedDate = dayjs(adventure.date).format('MM-DD-YYYY');
      return (
        <Marker
          key={adventure.adventure_id}
          position={[adventure.lat, adventure.lon]}
          eventHandlers={{
            click: (e) => {
              if (adventure.adventure_id) { 
                displayAssociatedCard(
                  e.target.options.children.props.children.key
                );
                zoomToLog(e.target._latlng, adventure.adventure_id);
              }
            },
          }}
        >
          <Popup>
            <p key={adventure.adventure_id} >
              {adventure.activity} log on {correctedDate}
            </p>
          </Popup>
        </Marker>
      );
    }
  });

  return (
    <div className='map-container'>
      <MapContainer
        center={[39.82, -98.57]}
        zoom={defaultZoomLevel}
        scrollWheelZoom={true}
        ref={mapRef as React.RefObject<any>}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapPoints}
      </MapContainer>
    </div>
  );
}

export default Map;
