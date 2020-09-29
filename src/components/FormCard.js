import React, {useCallback, useContext} from 'react';
import './FormCard.css';
import { withRouter } from "react-router-dom";
import { AuthContext } from "../services/auth";


import fire from '../services/fire';

const FormCard = ({history, display}) => {
    const handleAddPatient = useCallback(async event => {
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

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        debugger;
        let user = fire.auth().currentUser;
        user.updateProfile({
            displayName: document.querySelector('input').value
        }).then(function () {
            
        }).catch(function (error) {
            alert(error);
        });
    }
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