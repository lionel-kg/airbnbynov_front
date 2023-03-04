import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIcon from "../../../public/markerIcon.png"
import { useRouter } from 'next/router';

const myIcon = L.icon({
    iconUrl: markerIcon.src,
    iconSize: [37, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const Index = (props) => {
    const { latitude, longitude, places } = props;
    const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [map]);

  return (
    <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { Object.keys(places).length !== 0 ? <> {
        places.map((place)=>{
            return <Marker position={[place.address?.gps.lat, place.address?.gps.long]} icon={myIcon}>
                {console.log(place.address?.gps.lat, place.address?.gps.long)}
                <Popup>
                    <div>
                        <div onClick={()=>{window.open("/place/"+place.title+"/"+place._id);}}><img src={place.image[0]}/></div>
                        <div>{place.title}</div> 
                    </div>
                </Popup>
            </Marker>
        })
      }
      
      </>:null

      }
    </MapContainer>
  );
};

export default Index;
