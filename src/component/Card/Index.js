import React, { useContext, useState,useEffect} from 'react';
import styles from "./index.module.scss";
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import { Favorite, FavoriteBorder  } from '@mui/icons-material';
import WishlistContext from '../../context/WishlistContext';
import Carrousel from "../Carrousel/index";

const Index = (props) => {
    const {place} = props;
    const router = useRouter();
    const {addPlaceFromWishList, wishList ,removePlaceFromWishList, deleteWishList} = useContext(WishlistContext);
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        isInFavorite();
    }, [wishList]);

    const redirectDetail = () => {
        window.param
    }
    const isInFavorite = () => {
        const indexOfExisting = wishList.findIndex((el) => el._id === place._id);
        if(indexOfExisting === -1) {
            setIsFavorite(false)
        } else {
            setIsFavorite(true);
        }

    }

    return ( 
        <div className={styles.card_container}>
            <div className={styles.container_img_place} >
                {<div onClick={()=>{isFavorite === false ? addPlaceFromWishList(place) : removePlaceFromWishList(place._id)}}>{isFavorite === false ? <FavoriteBorder className={styles.favorite} />: <Favorite className={styles.favorite}/>}</div>}
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
            <div className={styles.overlay} onClick={()=> window.open("/place/"+place.title+"/"+place._id)}></div>
        </div>
    );
}

export default Index;
