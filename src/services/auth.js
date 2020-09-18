import React, { useEffect, useState } from "react";
import fire from "./fire.js";
import { boolean, string } from "yup";

const defaultUser = {
    currentUser: fire.user | null,
    authenticated: boolean,
    setCurrentUser: string,
    loadingAuthState: boolean,
    };
export const AuthContext = React.createContext(defaultUser);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingAuthState, setloadingAuthState] = useState(true);
    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            if (user){
                setCurrentUser(user);
                //console.log('mudou');    
                //console.log(user); 
            }
            //else {
              //  console.log('não mudou, mas passou')
            //}
            setloadingAuthState(false)
            
        });
    }, []);
    
    if (loadingAuthState) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={ 
                {   currentUser }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

