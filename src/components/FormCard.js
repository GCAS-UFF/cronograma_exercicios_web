import React, { useCallback, useContext } from 'react';
import './FormCard.css';
import { withRouter } from "react-router-dom";
import { AuthContext } from "../services/auth";
import api from '../services/api';

const FormCard = ({ history, display }) => {
    const handleAddPatient = useCallback(async event => {
        event.preventDefault();
        const { name, email, password } = event.target.elements;
        try {
            let data = {
                username: name.value,
                email: email.value,
                password: password.value,
                fisioId: currentUser.uid
            };
            const response = await api.post('/users', data);
            //console.log(response);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history])

    const { currentUser } = useContext(AuthContext);
    return (
        <div class="containerW">
            <form onSubmit={handleAddPatient} class="loginContainerW">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                />
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