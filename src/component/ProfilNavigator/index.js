import { useRouter } from 'next/router';
import React, {useContext} from 'react';
import { userContext } from '../../context/UserContext';
import styles from "./index.module.scss"

const Index = () => {
  const router = useRouter();
  const {state: globalState} = useContext(userContext);

  const isActive = (path) => {
    return router.pathname === path  ? styles.active : '';
  };

  return (
    <div className={styles.profil_navigator}>
      { globalState.user?.UserType  === "OWNER"?<div
        className={styles.profil_navigator_item +" "+isActive('/profil/booking')}
        onClick={() => router.push('/profil/booking')}
      >
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
      </div>
    </div>
  );
}

export default Index;