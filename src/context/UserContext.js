import {createContext, React, useState, useEffect} from 'react';
import userService from "../service/user.service";

const UserContext = createContext({
    user: {},
});

export default UserContext;

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, setToken] = useState(null)
    useEffect(() => {
        if(localStorage.getItem("token") !== null && user._id === undefined ) {
            userService.getMe(localStorage.getItem("token")).then((res) => {
                setUser(res.data);
                setToken(localStorage.getItem("token"));
            })
        }
    }, []);
    const context = {
        user,
        token
    }

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}

