import React, { useEffect, useContext, useState } from 'react';
import './Card.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import fire from '../services/fire';
import { AuthContext } from "../services/auth";


const Card = () => {
    const { currentUser } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const db = fire.firestore();
            db.collection("exercises").where("fisioId", "==", currentUser.uid)
                .get()
                .then(querySnapshot => {
                    setExercises(querySnapshot.docs.map(doc => ({ ...doc.data(), activities: activities })));
                    if (exercises.length > 0) {
                        debugger;
                        exercises.forEach(async (exercise) => { 
                            const db = fire.firestore();
                            db.collection("activities").where("exerciseId", "==", exercise.id)
                                .get()
                                .then(querySnapshot => {
                                    setActivities(querySnapshot.docs.map(doc => ({ ...doc.data() })));
                                });
                        });
                
                    }
                });
        };
        fetchData();

    }, []);


    console.log(exercises);
    console.log(activities);
    return (
        <div>
            {exercises.map((exercise) => (
                < div class="card" >
                    <div class="titleArea">
                        <p class="title">Paciente 2</p>
                        <div class="buttonAdd"><AddCircleIcon style={{ color: '#169BD5', fontSize: 50 }}></AddCircleIcon></div>
                    </div>
                    <div class="activityArea">
                        <div class="containertitle">
                            <div class="titleActivityArea">
                                <p class="titleActivity">{exercise.title}</p>
                                <p class="durationActivity">Início: {new Date(exercises[0].startDate.seconds * 1000).toLocaleDateString("pt-BR")} Fim: {new Date(exercises[0].endDate.seconds * 1000).toLocaleDateString("pt-BR")}</p>
                            </div>
                        </div>
                        <div class="activity">
                            <table>
                                {exercise.activities.map(activity => (
                                    <tr>
                                        <td>{activity.status}</td>
                                        <td>{activity.time}</td>
                                        <td>11/09/2020 11h</td>
                                    </tr>

                                ))}
                            </table>
                        </div>
                    </div>
                </div >
            )
            )
            }
        </div>

    );
}

export default Card;
