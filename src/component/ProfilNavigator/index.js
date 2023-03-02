import { useRouter } from 'next/router';
import React, {useContext, useEffect} from 'react';
import { userContext } from '../../context/UserContext';
import styles from "./index.module.scss"

const Index = () => {
  const router = useRouter();
  const {state: globalState} = useContext(userContext);

  const isActive = (path) => {
    return router.pathname === path  ? styles.active : '';
  };

  useEffect(() => {
    console.log(globalState.user);
  }, [globalState]);

  return (
    <div className={styles.profil_navigator}>
      { globalState.user?.isAdmin !== true ?
      <>
      { globalState.user?.userType  === "OWNER"?
      <div className={styles.profil_navigator_item +" "+isActive('/profil/booking')}
      onClick={() => router.push('/profil/booking')}>
        Mes reservations
      </div> : <div></div>
      }
      <div
        className={styles.profil_navigator_item +" "+isActive('/profil/travel')}
        onClick={() => router.push('/profil/travel')}
      >
        Mes voyages
      </div>
      <div
        className={styles.profil_navigator_item +" "+isActive('/profil/place')}
        onClick={() => router.push('/profil/place')}
      >
        Mes logements
      </div></>
        : 
      <> 
      <div className={styles.profil_navigator_item +" "+isActive('/admin/user')}
        onClick={() => router.push('/admin/user')}
      >
        Utilisateurs
      </div>
      <div className={styles.profil_navigator_item +" "+isActive('/admin/booking')}
        onClick={() => router.push('/admin/booking')}
      >
        Réservations
      </div></>
      }
      <div className={styles.profil_navigator_item +" "+isActive('/profil/wishlist')}
        onClick={() => router.push('/profil/wishlist')}
      >
        Mes favoris
      </div>
    </div> 
      
  );
}

export default Index;