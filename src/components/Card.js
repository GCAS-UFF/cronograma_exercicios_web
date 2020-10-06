import React, { useEffect, useContext, useState, useMemo } from 'react';
import './Card.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as admin from 'firebase-admin';

import fire from '../services/fire';
import { AuthContext } from "../services/auth";


const Card = () => {
    const { currentUser } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
    const [activities, setActivities] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const db = fire.firestore();
            db.collection("exercises").where("fisioId", "==", currentUser.uid)
                .get()
                .then(querySnapshot => {
                    setExercises(querySnapshot.docs.map(doc => ({ ...doc.data() })));
                    // db.collection("activities")
                    // .get()
                    // .then(querySnapshot => {
                    //     setActivities(querySnapshot.docs.map(d  => ({ ...d.data()})));   
                    // }); 
                });
        };
        fetchData();
    }, [currentUser.uid]);

    useMemo(() => {
        exercises.forEach(exercise => {
            exercise.activities = [];
            const db = fire.firestore();
            db.collection("activities").where("exerciseId", "==", exercise.id)
                .get()
                .then(querySnapshot => {
                    setActivities(querySnapshot.docs.map(d => ({ ...d.data() })));
                    exercise.activities = querySnapshot.docs.map(d => ({ ...d.data() }));
                    //const admin = require('firebase-admin');
                    // admin.auth().getUser(exercise.userId)
                    //     .then(function (userRecord) {
                    //         // See the UserRecord reference doc for the contents of userRecord.
                    //         console.log('Successfully fetched user data:', userRecord.toJSON());
                    //     })
                    //     .catch(function (error) {
                    //         console.log('Error fetching user data:', error);
                    //     });
                })
        });
    }, [exercises]);


    return (
        <div>
            {exercises.map((exercise) => (
                < div class="card" >
                    <div class="titleArea">
                        <p class="title">{exercise.userId}</p>
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
