import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import './Main.css';
import Header from '../../components/Header';
import Card from '../../components/Card';
import FormCard from '../../components/FormCard';
import fire from '../../services/fire';
import { AuthContext } from "../../services/auth";

const Main = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const [userWithoutFisio, setUserWithoutFisio] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [userSelected, setuserSelected] = useState(null);
    const handleAddUser = () => {
        setDisplayForm(true);
    }

    const close = (event) => {
        //debugger;
        //console.log(event.target.classList);
        if (displayForm && event.target.tagName !== "FORM" && typeof (event.target.form) === "undefined")//)
            setDisplayForm(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            const db = fire.firestore();
            db.collection("users").where("userId", "!=", currentUser.uid)
                .get()
                .then(
                    querySnapshot => {
                        setUserWithoutFisio(querySnapshot.docs.map(doc => ({ ...doc.data() })));
                    });
        };
        fetchData();
    }, [currentUser.uid]);

    const handleAutocomplete = (event, user) => {
        if (user != null) {
            console.log(user.userId)
            setuserSelected(user.userId);
        }
        else {
            setuserSelected(null)
        }
    }
    return (

        <div onClick={close}>

            <Header />
            {displayForm ? <FormCard /> : null}
            <div class="containerTop">
                <div class="containerTopWidgets">
                    <button style={{ height: 60.5, marginTop: 0 }} onClick={handleAddUser}>
                        <AddCircleIcon style={{ verticalAlign: 'middle' }} /> Adicionar Paciente
                    </button>
                    <Autocomplete
                        id="combo-box-demo"
                        options={userWithoutFisio.filter(option => 
                            option.fisioId === currentUser.uid || option.fisioId === null)}
                        getOptionLabel={(option) => option.name}
                        onChange={handleAutocomplete}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Buscar Paciente" variant="outlined" />}
                    />

                </div>
            </div>
            <Card user={userSelected} />
        </div>
    )
};

export default withRouter(Main);