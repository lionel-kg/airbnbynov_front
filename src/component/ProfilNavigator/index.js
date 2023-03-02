import { useRouter } from 'next/router';
import React from 'react';
import styles from "./index.module.scss"

const Index = () => {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path  ? styles.active : '';
  };

  return (
    <div className={styles.profil_navigator}>
      <div
        className={styles.profil_navigator_item +" "+isActive('/profil/booking')}
        onClick={() => router.push('/profil/booking')}
      >
        Mes reservations
      </div>
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