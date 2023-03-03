import { useRouter } from 'next/router';
import React, {useContext, useEffect} from 'react'
import { displayDate } from '../../tools/Date';
import styles from "./index.module.scss";
import CustomButton from '../CustomButton/Index'
import {userContext} from "../../context/UserContext";
import bookingService from '../../service/booking.service';

const index = (props) => {
    const {bookings,setIsUpdate,loading} = props;
    const router = useRouter();
    const { state: globalState } = useContext(userContext);

    const updateBooking = (id,status) => 
    {
        bookingService.updateBooking(id,status,globalState.user.token)
        .then(() => {
          setIsUpdate(true)
        }).catch((err)=>{
          console.log(err)
        })
       
    }

    // useEffect(() => {
    //   console.log(bookings);
    //   console.log(Object.keys(bookings).length);
    //   console.log(loading)
    // }, [])
    
  return (
      <div className="panelAdmin">
        <h1>Liste des réservations</h1>
        <table className="usersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Dates</th>
              <th>Statut</th>
              <th>Information utilisateurs</th>
              { router.pathname.includes("/profil/booking") ? 
                <th>Action</th> : <></>
              }
            </tr>
          </thead>
          <tbody>
            { loading !== true ?
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td><img  src={booking.place.image[0]} /></td>
                    <td>{booking.place.title}</td>
                    <td>{booking.price} €</td>
                    <td>
                      <div>Depart: {displayDate(booking.dateStart) }</div>
                      <div>Fin: {displayDate(booking.dateEnd)}</div>
                      <div>faite le : {displayDate(booking.createdAt)}</div>
                    </td>
                    <td>{booking.status}</td>
                    <td>
                      <div>Propriétaire: {booking.owner?.firstName+" "+booking.owner?.lastName}</div>
                      <div>Voyageur: {booking.customer?.firstName+" "+booking.customer?.lastName}</div>
                    </td>
                    <td>
                      { booking.status === "WAITING" && router.pathname.includes("/profil/booking") && globalState.user?.email === booking.owner.email  ?
                        <>
                          <CustomButton classes={styles.btn+" "+styles.accept_btn} text={"Accepter"} onClick={()=>{
                            updateBooking(booking._id,"VALIDATE"); setIsUpdate(false);
                          }}/>
                          <CustomButton classes={styles.btn+" "+styles.reject_btn} text={"Refuser"} onClick={()=>{
                            updateBooking(booking._id,"DECLINE"); setIsUpdate(false);
                          }}/>
                        </> : null
                      }
                    </td>
                  </tr>
                )) : null
            }
            
          </tbody>
        </table>
      </div>
  )
}

export default index