import React, { useCallback, useContext } from 'react';
import { withRouter } from "react-router-dom";

import Header from '../../components/Header';
import './RegisterExercise.css';
import fire from '../../services/fire';
import { AuthContext } from "../../services/auth";

const RegisterExercise = props => {
    //let { userId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const _onFocus = (e) => {
        e.currentTarget.type = "date";
    }
    const _onBlur = (e) => {
        e.currentTarget.type = "text";
    }
    const handleAddExercise = useCallback(async event => {
        debugger;
        let userId = props.match.params.userId;
        const db = fire.firestore();
        event.preventDefault();
        const { title, startDate, endDate, duration, repetitionsPerSeries } = event.target.elements;
        let hours = [];
        const elementHours = event.target.elements.hours;
        //[...elementHours].reduce((ex, checked) => {ex[user.userId] = [...ex[user.userId] || [], user]; return ex;}, {});
        [...elementHours].filter(e => e.checked === true).map(element => hours.push(element.value+":00"));
        //console.log(hours);
        db.collection("exercises").add({
            active: true,
            createdAt: new Date(),
            endDate: new Date(endDate.value),
            repetitionsPerSeries: repetitionsPerSeries.value,
            seriesDuration: duration.value,
            seriesTimes: hours,
            startDate: new Date(startDate.value),
            title: title.value,
            updatedAt: new Date(),
            userId: userId,
            fisioId: currentUser.uid
        })
            .then(function (docRef) {
                debugger;
                db.collection("exercises").doc(docRef.id).update({id: docRef.id});
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    })
    return (

        <div>
            <Header />
            <div class="container">
                <p class="titulo">Cadastrar Exercício</p>
                <form onSubmit={handleAddExercise} class="loginContainer">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                    />
                    <input
                        type="text"
                        name="startDate"
                        onFocus={_onFocus} onBlur={_onBlur}
                        placeholder="Data Início"
                    />
                    <input
                        type="text"
                        name="endDate"
                        onFocus={_onFocus} onBlur={_onBlur}
                        placeholder="Data Fim"
                    />
                    <input
                        type="time"
                        name="duration"
                        placeholder="Duração"
                    />
                    <input
                        type="number"
                        name="repetitionsPerSeries"
                        placeholder="Repetições por série"
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
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>)
}
export default withRouter(RegisterExercise);