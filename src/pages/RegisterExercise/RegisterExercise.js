import React, { useEffect, useContext, useState, useMemo } from 'react';
import { withRouter } from "react-router-dom";
import Header from '../../components/Header';
import './RegisterExercise.css';

const RegisterExercise = () => {
    const _onFocus = (e) => {
        e.currentTarget.type = "date";
    }
    const _onBlur = (e) => {
        e.currentTarget.type = "text";
    }
    return (

        <div>
            <Header />
            <div class="container">
                <p class="titulo">Cadastrar Exercício</p>
                <form onSubmit={() => { }} class="loginContainer">
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
                                <input type="checkbox" id="7" name="7"
                                /><label for="7">07:00</label>
                                
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="8" name="8"
                                />
                                <label for="8">08:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="9" name="9"
                                />
                                <label for="9">09:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="10" name="10"
                                />
                                <label for="10">10:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="11" name="11"
                                />
                                <label for="11">11:00</label>
                            </div>

                        </div>
                        <div class="containerHours">
                            <div class="containerHour">
                                <input type="checkbox" id="12" name="12"
                                />
                                <label for="12">12:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="13" name="13"
                                />
                                <label for="13">13:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="14" name="14"
                                />
                                <label for="14">14:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="15" name="15"
                                />
                                <label for="15">15:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="16" name="16"
                                />
                                <label for="16">16:00</label>
                            </div>
                        </div>
                        <div class="containerHours">
                            <div class="containerHour">
                                <input type="checkbox" id="17" name="17"
                                />
                                <label for="17">17:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="18" name="18"
                                />
                                <label for="18">18:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="19" name="19"
                                />
                                <label for="19">19:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="20" name="20"
                                />
                                <label for="20">20:00</label>
                            </div>
                            <div class="containerHour">
                                <input type="checkbox" id="21" name="21"
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