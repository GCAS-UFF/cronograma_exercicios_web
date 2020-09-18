import React from 'react';
import './Card.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Card = () => {
    return (
        <div class="card">
            <div class="titleArea">
                <p class="title">Paciente 2</p>
                <div class="buttonAdd"><AddCircleIcon style={{ color: '#169BD5', fontSize: 50 }}></AddCircleIcon></div>
            </div>
            <div class="activityArea">
                <div class="containertitle">
                    <div class="titleActivityArea">
                        <p class="titleActivity">Atividade 123</p>
                        <p class="durationActivity">Início: 11/09/2020 Fim: 20/09/2020</p>
                    </div>
                </div>
                <div class="activity">
                    <table>
                        <tr>
                            <td>Realizada</td>
                            <td>20min</td>
                            <td>11/09/2020 11h</td>
                        </tr>
                        <tr>
                            <td>Realizada</td>
                            <td>20min</td>
                            <td>11/09/2020 11h</td>
                        </tr>
                        <tr>
                            <td>Realizada</td>
                            <td>20min</td>
                            <td>11/09/2020 11h</td>
                        </tr>
                        <tr>
                            <td>Realizada</td>
                            <td>20min</td>
                            <td>11/09/2020 11h</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Card;
