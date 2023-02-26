import React, {useEffect,useState,useContext} from 'react';
import ProfilNavigator from "../../../component/ProfilNavigator/index";
import GridCard from "../../../component/GridCard/index";
import placeService from '../../../service/place.service';
import {userContext} from '../../../context/UserContext';
import WithAuth from '../../../HOC/withAuth';

const Index = () => {
    
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state: globalState } = useContext(userContext);


    useEffect(()=>{
        if(globalState.user?.token !== undefined && globalState.user?.token !== null){
            placeService.getMyPlace(globalState.user.token).then((res)=> {
                setPlaces(res.data);
                setLoading(false);
            })
        }
    },[globalState])

    return (
        <div className='page_wrapper'>
            <div className="profil_container">
                <ProfilNavigator />
                <div className='container_grid'>
                    <GridCard places={places} loading={loading}/> 
                </div>
            </div>
        </div>
    );
}

export default WithAuth(Index);
