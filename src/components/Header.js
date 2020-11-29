import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import './Header.css';
import fire from '../services/fire';
import { AuthContext } from "../services/auth";

const SignOut = () => {
    debugger;
    const { currentUser } = useContext(AuthContext);
    const out = () => {
        fire.auth().signOut()
        window.location.reload(false);
    }
    if (currentUser) {
        return <button class="sair" onClick={out}>Sair</button>
    }
    else {
        return null
    }
}

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Link to={`/main`}>    
        <header>Cronograma exercícios
            
            <SignOut />
            {currentUser ? 
            <div class="nameUser">Bem vindo(a) {currentUser.displayName == null ? currentUser.email : currentUser.displayName}!</div> : null}
        </header>
        </Link>

    );
}

export default Header;