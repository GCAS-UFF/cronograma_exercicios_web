import React, { useState, useEffect } from 'react';
import './Main.css';
import { withRouter } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Header from '../../components/Header';
import Card from '../../components/Card';
import fire from '../../services/fire';
import FormCard from '../../components/FormCard';

const Main = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const handleAddUser = () => {
        setDisplayForm(true);
    }

    const close = (event) => {
        debugger;
        console.log(event.target.classList);
        if (displayForm && event.target.tagName !== "FORM" && typeof(event.target.form) === "undefined")//)
            setDisplayForm(false);
    }

    return (

        <div onClick={close}>
            <Header />
            {displayForm ? <FormCard /> : null}
            <div class="containerTop">
                <div class="containerTopWidgets">
                    <button onClick={handleAddUser}>
                        <AddCircleIcon style={{ verticalAlign: 'middle' }} /> Adicionar Paciente
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar Paciente"
                        onChange={e => { }}
                    />

                </div>
            </div>
            <Card />
        </div>
    )
};

export default withRouter(Main);