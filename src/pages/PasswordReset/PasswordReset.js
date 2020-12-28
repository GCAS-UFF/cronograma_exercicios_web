import React, { useState, useCallback, useContext } from 'react';
import './PasswordReset.css';
import { Link, withRouter, Redirect } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import fire from "../../services/fire";
import { AuthContext, AuthProvider } from "../../services/auth";
import Button from '../../components/Button'

const PasswordReset = ({ history }) => {

    fire.auth().languageCode = 'pt-BR'; // para a mensagem de troca de senha ser em pt-br
    const [resetStatusMessage, setResetStatusMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setResetStatusMessage('');
      };

    const handleReset = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;
            try {
                setLoading(true);
                await fire
                    .auth()
                    .sendPasswordResetEmail(email.value);
                setResetStatusMessage('Uma mensagem de troca de senha foi enviada para o seu e-mail. Verifique, por favor.');
                setType("success")
                setOpen(true);
                setLoading(false);
                email.value="";
            } catch (error) {
                setOpen(true);
                setType("error");
                setLoading(false);
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
            <div class="container">
                <p class="titulo">Trocar a senha</p>
                <form onSubmit={handleReset} class="loginContainer">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={e => { }}
                    />
                    <Button loading={loading} disabled={disabled} value="Trocar a senha"/>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={type}>
                            {resetStatusMessage}
                        </Alert>
                    </Snackbar>
                    <p class="cadastroTexto"><Link to="/signIn">Voltar para a tela de Login</Link></p>
                </form> 
                <AuthProvider/>
            </div>

        </div>

    );
}

export default withRouter(PasswordReset);