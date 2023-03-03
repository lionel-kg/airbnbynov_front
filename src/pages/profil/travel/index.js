import React, {useState, useEffect, useContext} from 'react';
import ProfilNavigator from "../../../component/ProfilNavigator/index"
import {userContext} from '../../../context/UserContext';
import bookingService from '../../../service/booking.service';
import GridBooking from "../../../component/GridBooking/index"
import WithAuth from '../../../HOC/withAuth';
import SearchBar from "../../../component/SearchBar/index";

const Index = () => {
    const { state: globalState } = useContext(userContext);
    const [travels, setTravels] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(globalState.user?.token !== undefined && globalState.user?.token !== null){
            bookingService.getMyTravel(globalState.user.token).then((res)=> {
                setTravels(res.data);
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
              });
        }
    },[globalState])

    return (
        <div className='page_wrapper'>
            <div className="profil_container">
                <ProfilNavigator />
                <GridBooking bookings={travels} loading={loading}/>
            </div>
        </div>
    );
}

export default WithAuth(Index);
