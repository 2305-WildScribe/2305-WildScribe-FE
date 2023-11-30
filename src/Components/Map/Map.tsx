import { MutableRefObject, RefObject, useRef, useState } from 'react';
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
  
  type MapMethods = {
    flyTo: (coordinates: [number, number], zoom: number) => void;
  };

  const mapRef: RefObject<MapMethods> = useRef<MapMethods>(null as any);

  const validAdventures = adventures.filter(
    (adventure) =>
      adventure.lat && adventure.lon && adventure.activity === activity
  );

  function zoomToLog({ lat, lng }: { lat: number, lng: number }) {
    if (mapRef.current !== null) {
      mapRef.current?.flyTo([lat, lng], 15);
    }
  }
  

  const mapPoints = validAdventures.map((adventure) => {
    if (adventure.lat !== undefined && 
        adventure.lon !== undefined && 
       adventure.adventure_id !== undefined) {
      return (
        <Marker
          key={adventure.adventure_id}
          position={[adventure.lat, adventure.lon]}
          eventHandlers={{
            click: e => {
              // showSelectedBeweryCard(
              //   e.target._popup.options.children.props.children[0].props.children,
              // );
              zoomToLog(e.target._latlng);
            },
          }}
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
