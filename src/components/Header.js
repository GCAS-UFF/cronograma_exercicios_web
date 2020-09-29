import React, { useContext } from 'react';


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
    return (
        <header>Cronograma exercícios
            <SignOut />
        </header>

    );
}

export default Header;