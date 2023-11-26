import './Map.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map(): React.ReactElement {
  const defaultZoomLevel = 4;


  return (
    <div className='map-container'>
      <MapContainer center={[39.82, -98.57]}   
        zoom={defaultZoomLevel} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[39.82, -98.57]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
