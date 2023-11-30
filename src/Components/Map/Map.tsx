import { useState } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Adventure } from '../../types';

interface MapProps {
  activity: string | undefined;
}

function Map({ activity }: MapProps): React.ReactElement {
  // const [validAdventures, setValidAdventures] = useState<Adventure[]>([]);
  const defaultZoomLevel = 4;
  let adventures = useAppSelector(selectAdventures).adventures;
  // let activityTypes = useAppSelector(selectAdventures).activityTypes;

  const validAdventures = adventures.filter(
    (adventure) =>
      adventure.lat && adventure.lon && adventure.activity === activity
  );

  const mapPoints = validAdventures.map((adventure) => {
    if (adventure.lat !== undefined && adventure.lon !== undefined) {
      return (
        <Marker
          key={adventure.adventure_id}
          position={[adventure.lat, adventure.lon]}
        >
          <Popup>
            <p>
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
        scrollWheelZoom={false}
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
