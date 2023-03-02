import { useRouter } from 'next/router';
import {React, useContext, useEffect, useState} from 'react';
import { userContext } from '../context/UserContext';

const WithAdminAuth = (WrappedComponent) => {

    return ()=>{
        const [isAdmin, setIsAdmin] = useState(false);
        const {state: globalState} = useContext(userContext);
        const router = useRouter();
        useEffect(() => {
            if(globalState.user !== null ) {
                const isAdmin = globalState.user.isAdmin;
                if (!globalState.user.token || !isAdmin) {
                    setIsAdmin(false);
                    router.push("/profil");
                } else {
                    setIsAdmin(true);
                }
            }
            
        }, [globalState]);
        if(isAdmin) {
            return <WrappedComponent/>
        } else {
            return false;
        }
    }
}

export default WithAdminAuth;