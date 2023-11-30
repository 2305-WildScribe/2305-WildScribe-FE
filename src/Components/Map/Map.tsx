import { RefObject, useRef } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Adventure } from '../../types';
// import { Marker } from 'leaflet';

type MapMethods = {
  flyTo: (coordinates: [number, number], zoom: number) => void;
};

interface MapProps {
  activity: string | undefined;
  setSelectedLog: React.Dispatch<React.SetStateAction<Adventure | null>>
  zoomToLog: ({ lat, lng }: {
    lat: number;
    lng: number;
}) => void
mapRef: RefObject<MapMethods>
}

function Map({ activity, setSelectedLog, zoomToLog, mapRef }: MapProps): React.ReactElement {
  // const [validAdventures, setValidAdventures] = useState<Adventure[]>([]);
  const defaultZoomLevel = 4;
  let adventures = useAppSelector(selectAdventures).adventures;

  // type MapMethods = {
  //   flyTo: (coordinates: [number, number], zoom: number) => void;
  // };

  // const mapRef: RefObject<MapMethods> = useRef<MapMethods>(null as any);

  // const markersRef: RefObject<{}> = useRef<Adventure | null| {}>({});

  const validAdventures = adventures.filter(
    (adventure) =>
      adventure.lat && adventure.lon && adventure.activity === activity
  );

 

  const showSelectedLog = (key: string) => {
    const selectedAdventure = adventures.filter(adventure => adventure.adventure_id === key)[0];
    setSelectedLog(selectedAdventure);
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
              showSelectedLog(
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
