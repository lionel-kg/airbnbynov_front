import { useRouter } from 'next/router';
import {React, useEffect, useState} from 'react';

const WithAuth = (WrappedComponent) => {

    return ()=>{
        const [isLogged, setIsLogged] = useState(false);
        const router = useRouter();
        useEffect(() => {
           const token = localStorage.getItem("token");
            if (!token) {
                setIsLogged(false);
                router.push("/login");
            } else {
                setIsLogged(true);
            }
        }, []);
        if(isLogged) {
            return <WrappedComponent/>
        } else {
            return false;
        }
    }
}

export default WithAuth;
