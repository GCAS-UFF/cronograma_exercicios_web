import React, { useEffect, useContext, useState, useMemo } from 'react';
import './Card.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from "react-router-dom";

import fire from '../services/fire';
import { AuthContext } from "../services/auth";


const Card = props => {
    const { currentUser } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
    const [activities, setActivities] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const db = fire.firestore();
            db.collection("users").where("userId", "==", props.user)
                .get()
                .then(
                    querySnapshot => {
                        setUser(querySnapshot.docs.map(doc => ({ ...doc.data() })));
                    });
            db.collection("exercises").where("fisioId", "==", currentUser.uid)
                .get()
                .then(querySnapshot => {
                    setExercises(querySnapshot.docs.map(doc => ({ ...doc.data() })));
                });
        };
        fetchData();
    }, [props.user]);

    useMemo(() => {
        //exercises.reduce((ex, user) => {ex[user.userId] = [...ex[user.userId] || [], user]; return ex;}, {});
        exercises.forEach(exercise => {
            exercise.activities = [];
            //exercise.user = {};
            const db = fire.firestore();
            db.collection("activities").where("exerciseId", "==", exercise.id)
                .get()
                .then(querySnapshot => {
                    setActivities(querySnapshot.docs.map(d => ({ ...d.data() })));
                    exercise.activities = querySnapshot.docs.map(d => ({ ...d.data() }));
                })
        });
    }, [exercises]);

    // const addExercise = (userId) => {
    //     debugger;
    //     return 
    //     // <Link to="/registerExercise"/>
    //     <Redirect to={{
    //         pathname: "/registerExercise",
    //         state: { userId: userId }
    //     }} />
    // }

    return (
        <div>
            {user.map(us =>
                < div class="card" >
                    <div class="titleArea">
                        <p class="title">{us.name}</p>
                        <Link to={`/registerExercise/${us.userId}`}>
                            <AddCircleIcon style={{ color: '#169BD5', fontSize: 50 }}></AddCircleIcon>
                        </Link>
                    </div>
                    {exercises
                        .filter(exercise => exercise.userId === us.userId)
                        .map((exercise) => (
                            <div>
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
                            </div>

                        )
                        )
                    }
                </div >
            )}
        </div>

    );
}

export default Card;
