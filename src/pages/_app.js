import Script from 'next/script';
import { SearchContextProvider } from '../context/SearchContext';
import { UserContextProvider } from '../context/UserContext';
import {WishlistContextProvider} from '../context/WishlistContext';
import '../styles/style.scss';
import MainLayout from './layout/MainLayout';


function MyApp({ Component, pageProps }) {
  return <> <UserContextProvider><WishlistContextProvider><SearchContextProvider> <MainLayout> <Component {...pageProps} /></MainLayout></SearchContextProvider></WishlistContextProvider> </UserContextProvider> <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA35SwH7HsDR7Xqo-EcxZIQltNS_CN6B7w&libraries=places&callback=initMap"async></script></>
}

export default MyApp
