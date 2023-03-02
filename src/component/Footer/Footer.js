import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useState,useEffect} from 'react';
import styles from "./index.module.scss";


const Footer = () => {
  const router = useRouter();
  const [footerStyles, setFooterStyles] = useState(styles.footer__main);

  useEffect(() => {
    console.log(router.pathname)
    if(router.pathname.includes("profil")){
      setFooterStyles(styles.profil_footer);
    } else {
      setFooterStyles(styles.footer_main)
    }
  }, [router.pathname]);

    return (
      <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <ul>
              <li>
                <Link href="#">Airbnb</Link>
              </li>
              <li>
                <Link href="#">À propos</Link>
              </li>
              <li>
                <Link href="#">Carrières</Link>
              </li>
              <li>
                <Link href="#">Presse</Link>
              </li>
              <li>
                <Link href="#">Règles</Link>
              </li>
              <li>
                <Link href="#">Aide</Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <ul>
              <li>
                <Link href="#">Diversité et intégration</Link>
              </li>
              <li>
                <Link href="#">Accessibilité</Link>
              </li>
              <li>
                <Link href="#">Partenaires Airbnb</Link>
              </li>
              <li>
                <Link href="#">Logements d'urgence</Link>
              </li>
              <li>
                <Link href="#">Inviter des amis</Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <ul>
              <li>
                <Link href="#">Hébergement</Link>
              </li>
              <li>
                <Link href="#">Expériences</Link>
              </li>
              <li>
                <Link href="#">Expériences en ligne</Link>
              </li>
              <li>
                <Link href="#">Expériences de cuisine</Link>
              </li>
              <li>
                <Link href="#">Paiement</Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <ul>
              <li>
                <Link href="#">Conditions</Link>
              </li>
              <li>
                <Link href="#">Confidentialité</Link>
              </li>
              <li>
                <Link href="#">Plan du site</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socialIcons}>
          <Link href="#">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link href="#">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link href="#">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
        <div className={styles.legal}>
          <p>
            © 2023 Airbnb, Inc. Tous droits réservés ·
            <Link href="#">Confidentialité</Link> ·
            <Link href="#">Conditions</Link> ·
            <Link href="#">Plan du site</Link> ·
            <Link href="#">Détails de l'entreprise</Link>
          </p>
        </div>
      </div>
    </footer>

    );
}

export default Footer;
