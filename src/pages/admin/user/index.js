import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../../../context/UserContext';
import userService from '../../../service/user.service';
import ProfilNavigator from "../../../component/ProfilNavigator/index"
import WithAuth from '../../../HOC/withAuth';
import WithAdminAuth from '../../../HOC/withAdminAuth';


const Index = () => {
    const {state: globalState} = useContext(userContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // Ici, on effectue une requête à l'API pour récupérer les utilisateurs
      if(globalState.user !== null){
        userService.getUsers(globalState.user.token)
        .then((res) => {
            setUsers(res.data);
        });
      }
    }, [globalState]);
  
    return (
      <div className="panelAdmin">
        <ProfilNavigator />
        <h1>Liste des utilisateurs</h1>
        <table className="usersTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className={user.isAdmin? "isAdmin":""}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.UserType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default WithAuth(WithAdminAuth(Index));
