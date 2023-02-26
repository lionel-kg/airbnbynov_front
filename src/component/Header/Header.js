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
import AddUserForm from '../Form/Register/Add';
import LoginForm from '../Form/Login/index';
import UserContext from '../../context/UserContext';


// const preventDefault = f => e => {
//   e.preventDefault()
//   f(e)
// }

const Header = () => {
  // const {wishList} = useContext(WishlistContext);
  const {updateSearch} = useContext(SearchContext);
  const {token} = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
    if(token !== undefined && token !== null){
      typePlaceService.getTypePlaces()
      .then((res)=>{
        setTypePlaces(res.data);
      })
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setOpenMenu(false);
  }


    return (
        <header className={styles.header_main}>
        <div className={styles.header_logo} onClick={()=>{router.push("/home")}}>
          <img src={Logo.src} alt="Netflix" />
        </div>
        <div className={styles.searchBar}>
          <Input name="search" classes={styles.inputSearch} customWrapper={styles.input_wrapper} handleChange={(e)=>{ setTimeout(() => {
            updateSearch(e.target.value);
          }, 1000);
          }}/>
          <div className={styles.searchIcon}><Search/></div>
          {/*<TuneSharp className={styles.icons} onClick={()=>{setOpenModal(!openModal)}} />*/}
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
            <li className={styles.nav_item+" "+styles.box}>
              <div className={styles.container_menu}>
                <button className={styles.btn_menu} onClick={()=> /*router.push("/profil")*/ setOpenMenu(!openMenu)}>
                  <Menu />
                  <AccountCircleRounded/>
                </button>
                { openMenu ?
                  <div className={styles.dropdown_menu}>
                    { token !== undefined && token !== null ?
                      <> 
                        <Link href="/profil" className={styles.item_menu+" "+styles.fullWith} onClick={()=> {setOpenMenu(false)}}>
                            Profil
                        </Link>
                        <Link href="/login" className={styles.underbar+" "+styles.item_menu+" "+styles.fullWith} onClick={()=> {logout()}}>
                            Deconnexion
                        </Link>
                      </> 
                      : 
                      <> 
                        <Link href="" className={styles.item_menu+" "+styles.fullWith} onClick={()=>{setOpenRegisterModal(!openRegisterModal); setOpenMenu(false)}}>
                            inscription
                        </Link>
                        <Link className={styles.underbar+" "+styles.item_menu+" "+styles.fullWith} href="" onClick={()=>{setOpenLoginModal(!openRegisterModal); setOpenMenu(false)}}>
                            connexion
                        </Link>
                      </> 
                    }
                    <Link href="" className={styles.item_menu}>
                        Mettre mon logement sur Airbnb 
                    </Link>
                  </div> : null
                }
                
              </div>
              
            </li>
          </ul>
        </div>
        { openLoginModal ?
            <Modal show={openLoginModal} setShow={setOpenLoginModal} classes={styles.modal}>
                  <LoginForm setOpenLoginModal={setOpenLoginModal} />
            </Modal> : null
        }
        { openRegisterModal ?
            <Modal show={openRegisterModal} setShow={setOpenRegisterModal} classes={styles.modal}>
                  <AddUserForm setOpenRegisterModal={setOpenRegisterModal} />
            </Modal> : null
        }
        { openModal ?
            <Modal show={openModal} setShow={setOpenModal} title="Filtres" classes={styles.modal}>
                  <AddplaceForm />
            </Modal> : null
        }
      </header>
    );
}

export default Header;
