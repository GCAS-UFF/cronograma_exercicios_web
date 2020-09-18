import React, { useCallback } from 'react';
import './SignUp.css';
import { Link, withRouter } from "react-router-dom";


import fire from '../../services/fire';
import Header from '../../components/Header';

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
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
    }, [history]);
    return (
        <div>
            <Header />
            <div class="container">
                <p class="titulo">Cadastrar</p>
                    <form onSubmit={handleSignUp} class="loginContainer">
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
                        <p class="cadastroTexto">Já possui cadastro? <Link to="/signIn">Entrar</Link></p>
                    </form>
            </div>
        </div>

    );
}

export default withRouter(SignUp);