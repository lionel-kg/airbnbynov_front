import React, {useEffect,useState,useContext} from 'react';
import ProfilNavigator from "../../../component/ProfilNavigator/index";
import GridCard from "../../../component/GridCard/index";
import placeService from '../../../service/place.service';
import UserContext from "../../../context/UserContext"

const Index = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user,token} = useContext(UserContext);

    useEffect(()=>{
        if(token !== undefined && token !== null){
            placeService.getMyPlace(token).then((res)=> {
                console.log(res.data);
                setPlaces(res);
                setLoading(false);
            })
        }
    },[token])

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

export default Index;
