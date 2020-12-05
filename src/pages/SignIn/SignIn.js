import React, { useCallback, useContext } from 'react';
import './SignIn.css';
import { Link, withRouter, Redirect } from "react-router-dom";

import Header from '../../components/Header';
import fire from "../../services/fire";
import { AuthContext, AuthProvider } from "../../services/auth";

const SignIn = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await fire
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
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
                <p class="titulo">Entrar</p>
                <form onSubmit={handleLogin} class="loginContainer">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={e => { }}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={e => { }}
                    />
                    <button type="submit">Entrar</button>
                    <p class="cadastroTexto">Ainda não possui cadastro? <Link to="/signUp">Cadastrar</Link></p>
                    <Link to="/passwordReset">Esqueci a senha</Link>
                </form> 
                <AuthProvider/>
            </div>

        </div>

    );
}

export default withRouter(SignIn);