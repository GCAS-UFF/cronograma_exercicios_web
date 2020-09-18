import React, {useCallback, useState} from 'react';
import './FormCard.css';
import { withRouter } from "react-router-dom";

import fire from '../services/fire'

const FormCard = ({history, display}) => {
    const handleAdd = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await fire
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history])

    return (
        <div class="container">
            <form onSubmit={handleAdd} class="loginContainer">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default withRouter(FormCard);