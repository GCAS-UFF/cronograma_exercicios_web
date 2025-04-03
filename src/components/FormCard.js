import React, { useCallback, useContext, useState } from 'react';
import './FormCard.css';
import { withRouter } from "react-router-dom";
import { AuthContext } from "../services/auth";
import api from '../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Button from './Button'

const FormCard = ({ history, display }) => {
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');

    const messages = {
        'auth/email-already-exists': 'O endereço de e-mail já foi usado.',
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setMsg('');
      };

    const handleAddPatient = useCallback(async event => {
        event.preventDefault();
        setLoading(true);
        const { name, email, password } = event.target.elements;
        try {
            let data = {
                username: name.value,
                email: email.value,
                password: password.value,
                fisioId: currentUser.uid
            };
            const response = await api.post('/users', data);
            // console.log(response);
            setMsg('Paciente cadastrado com sucesso');
            setType("success")
            setOpen(true);
            setLoading(false);
            history.push("/");
        } catch (error) {
            setOpen(true);
            setType("error");
            setLoading(false);
            const defaultMessage = 'Ocorreu um erro ao cadastrar o paciente. Por favor, tente novamente mais tarde.';
            setMsg(error.response.data.message || defaultMessage);
        }
    }, [history])

    const { currentUser } = useContext(AuthContext);
    return (
        <div className="containerW">
            <form onSubmit={handleAddPatient} className="loginContainerW">
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
                <Button loading={loading} disabled={disabled} value="Cadastrar"/>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={type}>
                            {msg}
                        </Alert>
                </Snackbar>
                {/* <button type="submit">Cadastrar</button> */}
            </form>
        </div>
    )
}

export default withRouter(FormCard);