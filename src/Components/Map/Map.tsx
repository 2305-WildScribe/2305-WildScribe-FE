import { RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { selectAdventures, setSingleLog } from '../../Redux/slices/adventuresSlice';
import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type MapMethods = {
  flyTo: (coordinates: [number, number], zoom: number) => void;
};

interface MapProps {
  activity: string | undefined;
  zoomToLog: ({ lat, lng }: {
    lat: number;
    lng: number;
}) => void
mapRef: RefObject<MapMethods>
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
    console.log('key was pressed',key)
    dispatch(setSingleLog(key))
  };
  
  const mapPoints = validAdventures.map((adventure) => {
    if (
      adventure.lat !== undefined &&
      adventure.lon !== undefined &&
      adventure.adventure_id !== undefined
    ) {
      return (
        <Marker
          key={adventure.adventure_id}
          position={[adventure.lat, adventure.lon]} 
          eventHandlers={{
            click: (e) => {
              displayAssociatedCard(
                e.target.options.children.props.children.key
              );
              zoomToLog(e.target._latlng);
            },
          }}
        >
          <Popup>
            <p key={adventure.adventure_id}>
              {adventure.activity} log on {adventure.date}
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
