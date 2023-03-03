import React, { useContext, useState,useEffect} from 'react';
import styles from "./index.module.scss";
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import { Delete, Favorite, FavoriteBorder  } from '@mui/icons-material';
import WishlistContext from '../../context/WishlistContext';
import Carrousel from "../Carrousel/index";
import EditPlaceForm from '../Form/Places/Edit';
import Modal from "../Modal/Modal";
import placeService from '../../service/place.service';
import { userContext } from '../../context/UserContext';
import CustomButton from "../CustomButton/index";


const Index = (props) => {
    const {place, setIsDelete, setIsUpdate} = props;
    const router = useRouter();
    const { state: globalState } = useContext(userContext);
    const {addPlaceFromWishList, wishList ,removePlaceFromWishList, deleteWishList} = useContext(WishlistContext);
    const [isFavorite, setIsFavorite] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);


    useEffect(() => {
        isInFavorite();
    }, [wishList]);

    const actionOverlay = () => {
        if(router.pathname.includes("/profil/place")) {
            setOpenEditModal(true);
        } else {
            window.open("/place/"+place.title+"/"+place._id);
        }
    }
    const isInFavorite = () => {
        const indexOfExisting = wishList.findIndex((el) => el._id === place._id);
        if(indexOfExisting === -1) {
            setIsFavorite(false)
        } else {
            setIsFavorite(true);
        }
    }

    const deletePlace = () => {
        placeService.deleteMyPlace(globalState.user.token,place._id).then((place)=>{
            setIsDelete(true);
        });
    }

    return ( 
        <div className={styles.card_container}>
            <div className={styles.container_img_place} >
                {router.pathname.includes("/profil/place") ? <div onClick={()=> setOpenDeleteModal(true)}> <Delete className={styles.favorite+" "+styles.delete} /></div> : <div onClick={()=>{isFavorite === false ? addPlaceFromWishList(place) : removePlaceFromWishList(place._id)}}>{isFavorite === false ? <FavoriteBorder className={styles.favorite} />: <Favorite className={styles.favorite}/>}</div>}
                <Carrousel imgs={place.image}/>
            </div>
            <div className={styles.places_content}>
                <div className={styles.title}>{place.title}</div>
                <div className={styles.location_capacity}>
                    <p>{place.address.street+" "+place.address.zipCode+", "+place.address.city}</p>
                    <div className={styles.capacity}><PersonIcon /> <span>{place.capacity}</span></div>
                </div>
                <div className={styles.pricing}><strong className={styles.price}>{place.pricing.perDay+" € "}</strong><span>par nuit</span></div>
            </div>
            <div className={styles.overlay} onClick={()=> {actionOverlay()}}></div>
            { openEditModal ?
                <Modal show={openEditModal} setShow={setOpenEditModal} title="Update" classes={styles.modal}>
                    <EditPlaceForm place={place} setOpenEditModal={setOpenEditModal} setIsUpdate={setIsUpdate}/>
                </Modal> : null
            }
            { openDeleteModal ?
                <Modal show={openDeleteModal} setShow={setOpenDeleteModal} title={place.title} classes={styles.modalWarning}>
                    <div className={styles.warningMsg}>
                        êtes vous sur de vouloir supprimer votre hébergement ?
                    </div>
                    <div className={styles.groupButton}>
                    <CustomButton classes={styles.btn+" "+styles.accept_btn} text={"Confirmer"} onClick={()=>{
                        deletePlace(); setOpenDeleteModal(false);
                      }}/>
                      <CustomButton classes={styles.btn+" "+styles.reject_btn} text={"Refuser"} onClick={()=>{
                        setOpenDeleteModal(false)
                      }}/>
                    </div>
                </Modal> : null
            }
            
        </div>
    );
}

export default Index;
