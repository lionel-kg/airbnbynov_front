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
      <footer className={footerStyles}>
        Footer
      </footer>
    );
}

export default Footer;
