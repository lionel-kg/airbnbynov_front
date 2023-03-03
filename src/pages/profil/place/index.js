import React, {useEffect,useState,useContext} from 'react';
import ProfilNavigator from "../../../component/ProfilNavigator/index";
import GridCard from "../../../component/GridCard/index";
import placeService from '../../../service/place.service';
import {userContext} from '../../../context/UserContext';
import WithAuth from '../../../HOC/withAuth';

const Index = () => {
    
    const [places, setPlaces] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const { state: globalState } = useContext(userContext);


    useEffect(()=>{
        if(globalState.user?.token !== undefined && globalState.user?.token !== null){
            placeService.getMyPlace(globalState.user.token).then((res)=> {
                setPlaces(res.data);
                setIsDelete(false);
                setIsUpdate(false);
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
              });
        }
    },[globalState,isDelete,isUpdate])

    return (
        <div className='page_wrapper'>
            <div className="profil_container">
                <ProfilNavigator />
                <div className='container_grid_place'>
                    <GridCard places={places} setIsDelete={setIsDelete} setIsUpdate={setIsUpdate} loading={loading}/> 
                </div>
            </div>
        </div>
    );
}

export default WithAuth(Index);
