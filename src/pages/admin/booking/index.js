import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../../../context/UserContext';
import boookingService from '../../../service/booking.service';
import { displayDate } from '../../../tools/Date';
import ProfilNavigator from "../../../component/ProfilNavigator/index"
import WithAuth from '../../../HOC/withAuth';
import GridBooking from "../../../component/GridBooking/index"
import WithAdminAuth from '../../../HOC/withAdminAuth';


const Index = () => {
    const {state: globalState} = useContext(userContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Ici, on effectue une requête à l'API pour récupérer les utilisateurs
      if(globalState.user !== null){
        boookingService.getBookings(globalState.user.token)
        .then((res) => {
          console.log(res.data);
          setBookings(res.data);
          setLoading(false)
        }).catch((err)=>{
          console.log(err);
        });
      }
    }, [globalState]);
  
    return (
      <>
        <ProfilNavigator />
        {loading === false ?
          <GridBooking bookings={bookings}/>:null
        }
      </>
    );
  };

export default WithAuth(WithAdminAuth(Index));
