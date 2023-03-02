import React, {useState, useEffect, useContext} from 'react';
import ProfilNavigator from "../../../component/ProfilNavigator/index"
import {userContext} from '../../../context/UserContext';
import bookingService from '../../../service/booking.service';
import GridBooking from "../../../component/GridBooking/index"
import WithAuth from '../../../HOC/withAuth';

const Index = () => {
    //const {token} = useContext(UserContext);
    const { state: globalState } = useContext(userContext);
    const [bookings, setBookings] = useState({});
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        console.log(globalState);
        if(globalState.user?.token !== undefined && globalState.user?.token !== null){
            bookingService.getMyBooking(globalState.user.token).then((res)=> {
                setBookings(res.data);
                setLoading(false);
            })
        }
    },[globalState,isUpdate])
    return (
        <div className='page_wrapper'>
            <div className="profil_container">
                <ProfilNavigator />
                <GridBooking bookings={bookings} setIsUpdate={setIsUpdate} loading={loading}/>
            </div>
        </div>
    );
}

export default WithAuth(Index);