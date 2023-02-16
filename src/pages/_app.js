import { SearchContextProvider } from '../context/SearchContext';
import { UserContextProvider } from '../context/UserContext';
import {WishlistContextProvider} from '../context/WishlistContext';
import '../styles/style.scss';
import MainLayout from './layout/MainLayout';

function MyApp({ Component, pageProps }) {
  return <> <UserContextProvider><WishlistContextProvider><SearchContextProvider> <MainLayout> <Component {...pageProps} /></MainLayout></SearchContextProvider></WishlistContextProvider> </UserContextProvider></>
}

export default MyApp
