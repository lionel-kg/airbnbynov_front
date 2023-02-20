import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import styles from "./index.module.scss";
import Image from 'next/image'
import Logo from "../../../public/logo.png";
import WishlistContext from '../../context/WishlistContext';
import SearchContext from '../../context/SearchContext';
import { AccountCircleRounded, Filter, FilterAlt, FilterAltRounded, LanguageRounded, Menu, Search, TuneSharp  } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Input from '../Input';
import Modal from '../Modal/Modal';
import typePlaceService from '../../service/typePlace.service';
import CustomSelect from "../CustomSelect/index";
import CustomButton from "../CustomButton/index";
import placeService from '../../service/place.service';
import AddplaceForm from '../Form/Places/Add';

// const preventDefault = f => e => {
//   e.preventDefault()
//   f(e)
// }

const Header = () => {
  // const {wishList} = useContext(WishlistContext);
  const {updateSearch} = useContext(SearchContext);
  const [openModal, setOpenModal] = useState(false);
  const [typePlaces, setTypePlaces] = useState({});
  // const [path, setPath] = useState("");
  // const [capacityDefault, setCapacityDefault] = useState({
  //   min: 0,
  //   max: 50
  // });
  // const [priceDefault, setPriceDefault] = useState({
  //   min: 0,
  //   max: 50
  // });
  const [value, setValue] = useState();
  const router = useRouter();

  // const handleParam = setValue => e => setValue(e.target.value)

  // const handleSubmit = preventDefault(() => {
  //   window.history.replaceState({ ...window.history.state, as: path, url: path }, '', path);

  // })

  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    typePlaceService.getTypePlaces()
    .then((res)=>{
      setTypePlaces(res.data);
    })
  }, []);

  const submit = () => {
    if(value !== undefined && value.length !== 0){
      

    }
      
    
    setOpenModal(false);
  }


    return (
        <header className={styles.header_main}>
        <div className={styles.header_logo} onClick={()=>{router.push("/home")}}>
          <img src={Logo.src} alt="Netflix" />
        </div>
        <div className={styles.searchBar}>
          <Input name="search" classes={styles.inputSearch} handleChange={(e)=>{ setTimeout(() => {
            updateSearch(e.target.value);
          }, 1000);
          }}/>
          <div className={styles.searchIcon}><Search/></div>
          <TuneSharp className={styles.icons} onClick={()=>{setOpenModal(!openModal)}} />
        </div>
        <div className={styles.header_menu}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
              <CustomButton classes={styles.addPlace} text={"Mettre mon logement sur Airbnb"} onClick={()=>{setOpenModal(!openModal)}}>
                
              </CustomButton>
            </li>
            <li className={styles.nav_item}>
              <Link href="/register">
                <LanguageRounded/>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <button className={styles.btn_menu} onClick={()=>router.push("/profil")}>
                <Menu />
                <AccountCircleRounded/>
              </button>
            </li>
          </ul>
        </div>
        { openModal ?
            <Modal show={openModal} setShow={setOpenModal} title="Filtres" classes={styles.modal}>
                  <AddplaceForm />
            </Modal> : null
        }
      </header>
    );
}

export default Header;
