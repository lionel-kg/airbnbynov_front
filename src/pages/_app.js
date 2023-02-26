import Script from 'next/script';
import { SearchContextProvider } from '../context/SearchContext';
import {WishlistContextProvider} from '../context/WishlistContext';
import '../styles/style.scss';
import MainLayout from './layout/MainLayout';
import {StateProvider } from "../context/UserContext";


function MyApp({ Component, pageProps }) {
  return <> <StateProvider ><WishlistContextProvider><SearchContextProvider> <MainLayout> <Component {...pageProps} /></MainLayout></SearchContextProvider></WishlistContextProvider></StateProvider ><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA35SwH7HsDR7Xqo-EcxZIQltNS_CN6B7w&libraries=places"async></script></>
}

export default MyApp
