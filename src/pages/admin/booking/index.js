import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../../../context/UserContext';
import boookingService from '../../../service/booking.service';
import { displayDate } from '../../../tools/Date';

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
        });
      }
    }, [globalState]);
  
    return (
      <div className="panelAdmin">
        <h1>Liste des réservations</h1>
        <table className="usersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nom</th>
              <th>Dates</th>
              <th>Information utilisateurs</th>
            </tr>
          </thead>
          <tbody>
            { loading !== true ?
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td><img  src={booking.place.image[0]} /></td>
                    <td>{booking.place.title}</td>
                    <td>
                      <div>Depart: {displayDate(booking.dateStart) }</div>
                      <div>Fin: {displayDate(booking.dateEnd)}</div>
                      <div>faite le : {displayDate(booking.createdAt)}</div>
                    </td>
                    <td>
                      <div>Propriétaire: {booking.owner?.firstName+" "+booking.owner?.lastName}</div>
                      <div>Voyageur: {booking.customer?.firstName+" "+booking.customer?.lastName}</div>
                    </td>
                  </tr>
                )) : null
            }
            
          </tbody>
        </table>
      </div>
    );
  };

export default Index;
