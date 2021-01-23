import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import NavBar from '../../components/NavBar';
import './RegisterExercise.css';
import fire from '../../services/fire';
import { AuthContext } from "../../services/auth";
import Button from '../../components/Button'

const RegisterExercise = props => {

    const { currentUser } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setMsg('');
      };

    const _onFocus = (e) => {
        e.currentTarget.type = "date";
    }
    const _onBlur = (e) => {
        e.currentTarget.type = "text";
    }
    const handleAddExercise = useCallback(async event => {
        setLoading(true);
        let userId = props.match.params.userId;
        const db = fire.firestore();
        event.preventDefault();
        const { title, startDate, endDate, duration, repetitionsPerSeries } = event.target.elements;
        let hours = [];
        const elementHours = event.target.elements.hours;
        //[...elementHours].reduce((ex, checked) => {ex[user.userId] = [...ex[user.userId] || [], user]; return ex;}, {});
        [...elementHours].filter(e => e.checked === true).map(element => hours.push(element.value + ":00"));
        //console.log(hours);
        
        let now = new Date();
        db.collection("exercises").add({
            active: true,
            createdAt: now,
            endDate: new Date(endDate.value + " 00:00:00"),
            repetitionsPerSeries: parseInt(repetitionsPerSeries.value),
            seriesDuration: duration.value,
            seriesTimes: hours,
            startDate: new Date(startDate.value + " 00:00:00"),
            title: title.value,
            updatedAt: now,
            userId: userId,
            fisioId: currentUser.uid
        })
            .then(function (docRef) {
                //debugger;
                db.collection("exercises").doc(docRef.id).update({ id: docRef.id });
                let date = new Date(startDate.value);
                let dates = [];
                for (date; date <= new Date(endDate.value); date.setDate(date.getDate() + 1)) {
                    hours.map(hour => dates.push(new Date(date.setHours(parseInt(hour.replace(":00", ""))))));
                }
                dates.map(date => {
                    db.collection("activities").add({
                        createdAt: now,
                        exerciseId: docRef.id,
                        status: "Agendada",
                        time: (date.getHours()).toString()+":00",
                        updatedAt: now,
                        prescribedTo: date,
                    })
                    .then(function (docRef) {
                        //debugger;
                        db.collection("activities").doc(docRef.id).update({ id: docRef.id });
                        setMsg('Exercício cadastrado com sucesso');
                        setType("success")
                        setOpen(true);
                        setLoading(false);
                        title.value=""; 
                        startDate.value = null; 
                        endDate.value=null;
                        duration.value=null; 
                        repetitionsPerSeries.value=null;
                    })
                    .catch(function (error) {
                setOpen(true);
                setType("error");
                setLoading(false);
                setMsg('Ocorreu um erro ao cadastrar o exercício. Por favor, tente novamente mais tarde.');
                    });
                })    
                db.collection("users")
                .where("userId", "==", userId)
                .get()
                .then(querySnapshot => {querySnapshot.forEach(function(doc) {
                // console.log(doc.id, " => ", doc.data());
                db.collection("users").doc(doc.id).update({fisioId: currentUser.uid});         
                        })
                    })        
            })
            .catch(function (error) {
                setOpen(true);
                setType("error");
                setLoading(false);
                setMsg('Ocorreu um erro ao cadastrar o exercício. Por favor, tente novamente mais tarde.');
            });
    })
    return (

        <div>
            <NavBar />
            <div class="container">
                <p class="titulo">Cadastrar Exercício</p>
                <form onSubmit={handleAddExercise} class="loginContainer">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        required
                    />
                    <input
                        type="text"
                        name="startDate"
                        onFocus={_onFocus} onBlur={_onBlur}
                        placeholder="Data Início"
                        required
                    />
                    <input
                        type="text"
                        name="endDate"
                        onFocus={_onFocus} onBlur={_onBlur}
                        placeholder="Data Fim"
                        required
                    />
                    <input
                        type="time"
                        name="duration"
                        placeholder="Duração"
                        required
                    />
                    <input
                        type="number"
                        name="repetitionsPerSeries"
                        placeholder="Repetições por série"
                        required
                    />
                    <div class="hours">
                        <div class="containerHours">
                            <div class="containerHour">
                                <input type="checkbox" id="7" name="hours" value="7"
                                /><label for="7">07:00</label>

                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="8" name="hours" value="8"
                                />
                                <label for="8">08:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="9" name="hours" value="9"
                                />
                                <label for="9">09:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="10" name="hours" value="10"
                                />
                                <label for="10">10:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="11" name="hours" value="11"
                                />
                                <label for="11">11:00</label>
                            </div>

                        </div>
                        <div class="containerHours">
                            <div class="containerHour">
                                <input type="checkbox" id="12" name="hours" value="12"
                                />
                                <label for="12">12:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="13" name="hours" value="13"
                                />
                                <label for="13">13:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="14" name="hours" value="14"
                                />
                                <label for="14">14:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="15" name="hours" value="15"
                                />
                                <label for="15">15:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="16" name="hours" value="16"
                                />
                                <label for="16">16:00</label>
                            </div>
                        </div>
                        <div class="containerHours">
                            <div class="containerHour">
                                <input type="checkbox" id="17" name="hours" value="17"
                                />
                                <label for="17">17:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="18" name="hours" value="18"
                                />
                                <label for="18">18:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="19" name="hours" value="19"
                                />
                                <label for="19">19:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="20" name="hours" value="20"
                                />
                                <label for="20">20:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="21" name="hours" value="21"
                                />
                                <label for="21">21:00</label>
                            </div>
                        </div>
                    </div>
                    <Button loading={loading} disabled={disabled} value="Cadastrar"/>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={type}>
                            {msg}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </div>)
}
export default withRouter(RegisterExercise);