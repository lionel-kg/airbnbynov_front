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
    const { state: globalState,dispatch } = useContext(userContext);

    const updateBooking = (id,status) => 
    {
        bookingService.updateBooking(id,status,globalState.user.token)
        .then(() => {
          setIsUpdate(true)
        })
       
    }

    useEffect(() => {
      console.log(loading)
    }, [globalState])
    
  return (
    <>
         { loading !== true  ? bookings.map((booking) => {
            return (
              <div key={booking._id} className={styles.booking_grid}>
                <img className={styles.booking_image} src={booking.place.image[0]} />
                <div className={styles.booking_users_info}>
                    <p>Voyageur: <span>{booking.customer.firstName+" "+booking.customer.lastName }</span></p>
                    <p>Propriétaire: <span>{booking.owner.firstName+" "+booking.owner.lastName }</span></p>
                </div>
                <div className={styles.booking_container_info}>
                  <div>
                    <h1 className={styles.title}>{booking.place.title}</h1>
                    <p>Depart: <span>{displayDate(booking.dateStart) }</span></p>
                    <p>Fin: <span>{displayDate(booking.dateEnd) }</span></p>
                    <p>Faite le: <span>{displayDate(booking.createdAt) }</span></p>
                  </div> 
                </div> 
                <div className={styles.booking_price}>
                    <h1>{booking.price} €</h1>
                </div>
                <div className={styles.booking_status}>
                    <h1>{booking.status}</h1>
                </div>
                <div className={styles.booking_action}>
                  { booking.status === "WAITING" && router.pathname.includes("booking") && globalState.user?.email === booking.owner.email  ?
                    <>
                      <CustomButton classes={styles.btn+" "+styles.accept_btn} text={"Accepter"} onClick={()=>{
                        updateBooking(booking._id,"VALIDATE"); setIsUpdate(false);
                      }}/>
                      <CustomButton classes={styles.btn+" "+styles.reject_btn} text={"Refuser"} onClick={()=>{
                        updateBooking(booking._id,"DECLINE"); setIsUpdate(false);
                      }}/>
                    </> : null
                  }
                    
                </div>
              </div>
              )
            })
            : "loading"}
            
    </>
  )
}

export default index