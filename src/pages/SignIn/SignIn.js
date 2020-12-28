import React, { useCallback, useContext, useState } from 'react';
import './SignIn.css';
import { Link, withRouter, Redirect } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import fire from "../../services/fire";
import Button from '../../components/Button';
import { AuthContext, AuthProvider } from "../../services/auth";

const SignIn = ({ history }) => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    fire.auth().languageCode = 'PT-BR'; // para a mensagem de troca de senha ser em pt-br
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setMsg('');
      };

    const handleLogin = useCallback(
        async event => {
            setLoading(true);
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await fire
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                setOpen(true);
                setMsg(error.message);
                setLoading(false);
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
            <div class="container">
                <p class="titulo">Entrar</p>
                <form onSubmit={handleLogin} class="loginContainer">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={e => { }}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        onChange={e => { }}
                        required
                    />
                    <Button loading={loading} disabled={disabled} value="Entrar" />
                    <p class="cadastroTexto">Ainda não possui cadastro? <Link to="/signUp">Cadastrar</Link></p>
                    <Link to="/passwordReset">Esqueci a senha</Link>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {msg}
                        </Alert>
                    </Snackbar>
                </form> 
                <AuthProvider/>
            </div>

        </div>

    );
}

export default withRouter(SignIn);