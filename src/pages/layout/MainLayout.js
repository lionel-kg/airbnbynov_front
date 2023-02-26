import React, {useContext, useEffect, useState} from 'react';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';
import {userContext} from '../../context/UserContext';
import authService from '../../service/auth.service';


const MainLayout = ({children}) => {
    const { state, dispatch } = useContext(userContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (state.user === null && token !== null && loading !== false) {
            console.log(state);
            authService.refreshLogin(token)
                .then((res) => {
                    dispatch({ type: "login", payload: res.data.user });
                    setLoading(false);
                })
                .catch((err) => {
                    dispatch({ type: "logout" });
                    console.log("error refreshing login");
                    console.log(err);
                });
        }
    }, [state, dispatch]);

    return (
        <>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
    );
}

export default MainLayout;
