import React, { useState, useCallback, useContext } from 'react';
import './PasswordReset.css';
import { Link, withRouter, Redirect } from "react-router-dom";

import Header from '../../components/Header';
import fire from "../../services/fire";
import { AuthContext, AuthProvider } from "../../services/auth";

const PasswordReset = ({ history }) => {

    fire.auth().languageCode = 'pt-BR'; // para a mensagem de troca de senha ser em pt-br
    const [resetStatusMessage, setResetStatusMessage] = useState('');

    const handleReset = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;
            try {
                setResetStatusMessage('Solicitando troca de senha...');
                await fire
                    .auth()
                    .sendPasswordResetEmail(email.value);
                setResetStatusMessage('Uma mensagem de troca de senha foi enviada para o seu e-mail. Verifique, por favor.');
            } catch (error) {
                setResetStatusMessage('Ocorreu um erro ao solicitar a troca de senha. Por favor, tente novamente mais tarde.');
            }
        },
        [history]
    );
    
    const { currentUser } = useContext(AuthContext);

    //console.log('currentUser', currentUser);
    if (currentUser) {
        return <Redirect to="/main" />;
    }

    return (
        <div>
            <Header />
            <div class="container">
                <p class="titulo">Trocar a senha</p>
                <form onSubmit={handleReset} class="loginContainer">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={e => { }}
                    />
                    <button type="submit">Trocar a senha</button>
                    <p>{resetStatusMessage}</p>
                    <p class="cadastroTexto"><Link to="/signIn">Voltar para a tela de Login</Link></p>
                </form> 
                <AuthProvider/>
            </div>

        </div>

    );
}

export default withRouter(PasswordReset);