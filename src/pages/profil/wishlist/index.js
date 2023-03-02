import React, {useEffect,useState,useContext} from 'react';
import ProfilNavigator from "../../../component/ProfilNavigator/index";
import GridCard from "../../../component/GridCard/index";
import placeService from '../../../service/place.service';
import WithAuth from '../../../HOC/withAuth';
import WishlistContext from '../../../context/WishlistContext';

const Index = () => {
    
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const { wishList } = useContext(WishlistContext);


    useEffect(()=>{
        if(wishList !== null){
            setPlaces(wishList);
            setLoading(false);
        }
    },[wishList])

    return (
        <div className='page_wrapper'>
            <div className="profil_container">
                <ProfilNavigator />
                <div className='container_grid_place'>
                    { places.length !== 0 ?
                        <GridCard places={places} loading={loading}/> : null
                    }
                </div>
            </div>
        </div>
    );
}

export default WithAuth(Index);