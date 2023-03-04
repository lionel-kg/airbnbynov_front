import TitlePage from "../component/TitlePage";
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../component/Map'), { ssr: false });

export default function Home() {
  const latitude = 48.856614; // latitude de Paris
  const longitude = 2.3522219; // longitude de Paris
  return (
    <div className='homepage_container'>
      <h1>Ma Carte</h1>
      <MapComponent latitude={latitude} longitude={longitude} />
    </div>
    
   
  )
}