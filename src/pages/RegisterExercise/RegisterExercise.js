import React, { useEffect, useContext, useState, useMemo } from 'react';
import { withRouter } from "react-router-dom";
import Header from '../../components/Header';

const RegisterExercise = () => {
    const _onFocus= (e) =>{
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
                        onFocus = {_onFocus} onBlur={_onBlur}
                        placeholder="Data Início"
                    />
                    <input
                        type="text"
                        name="endDate"
                        onFocus = {_onFocus} onBlur={_onBlur}
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
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>)
}
export default withRouter(RegisterExercise);