import React, { useCallback, useContext, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import fire from '../../services/fire';
import Button from '../../components/Button'
import { AuthContext } from "../../services/auth";
import './SignUp.css';

const SignUp = ({ history }) => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    fire.auth().languageCode = 'pt-BR'; // para a mensagem de troca de senha ser em pt-br

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setMsg('');
      };

    const handleSignUp = useCallback(
        async event => {
            setLoading(true);
            event.preventDefault();
            const { email, password, name } = event.target.elements;
            if (email && password && name) {
                try {
                    await fire
                        .auth()
                        .createUserWithEmailAndPassword(email.value, password.value);
                    history.push("/");
                } catch (error) {
                    setOpen(true);
                    setMsg(error.message);
                    setLoading(false);
                }
            }
        }, [history]);
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        //debugger;
        let user = fire.auth().currentUser;
        user.updateProfile({
            displayName: document.querySelector('input').value
        }).then(function () {
            setDisabled(false);
            setLoading(false);
        }).catch(function (error) {
            setOpen(true);
            setMsg(error.message);
            setLoading(false);
        });
    }
    return (
        <div>
            <div class="container">
                <p class="titulo">Cadastrar</p>
                <form onSubmit={handleSignUp} class="loginContainer">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        required
                    />
                    <Button loading={loading} disabled={disabled} value="Cadastrar" />
                    <p class="cadastroTexto">Já possui cadastro? <Link to="/signIn">Entrar</Link></p>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {msg}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </div>

    );
}

export default withRouter(SignUp);