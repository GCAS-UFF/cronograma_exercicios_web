import React, { useEffect, useContext, useState, useMemo } from 'react';
import './Card.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from "react-router-dom";

import fire from '../services/fire';
import { AuthContext } from "../services/auth";
import api from '../services/api';


const Card = props => {
    const { currentUser } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
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
            let responseExercise = [];
            responseExercise = await api.get('/exercises?id=' + currentUser.uid);
            let arrayEx = []
            responseExercise.data.map(async exercise => {
                let responseActity = []
                responseActity = await api.get('/activities?id=' + exercise.id);
                const ex = { ...exercise, activities: responseActity.data || [] }
                if (arrayEx.indexOf(ex) === -1)
                    arrayEx.push(ex)
                setExercises([...arrayEx])
            })
        }
        props.user ? fetchData() : setExercises([]); setUser([])
    }, [props.user]);

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
                        .filter((este, i) => exercises.indexOf(este) === i)
                        .map((exercise) => (
                            <div>
                                <div class="activityArea">
                                    <div class="containertitle">
                                        <div class="titleActivityArea">
                                            <p class="titleActivity">{exercise.title}</p>
                                            <p class="durationActivity">
                                                Início: {new Date(exercise.startDate._seconds * 1000).toLocaleDateString("pt-BR") + " " + new Date(exercise.startDate._seconds * 1000).toTimeString().slice(0, 5)
                                                } Fim: {new Date(exercise.endDate._seconds * 1000).toLocaleDateString("pt-BR") + " " + new Date(exercise.endDate._seconds * 1000).toTimeString().slice(0, 5)
                                                }</p>
                                        </div>
                                    </div>
                                    <div class="activity">
                                        {/* <div>{'Tamanho do exercise.activities '+exercise.activities.length}</div> */}
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Status</th>
                                                    <th>Horário</th>
                                                    <th>Prescrita para</th>
                                                    <th>Registrada em</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {exercise.activities ?
                                                    (exercise.activities.map(activity => (
                                                        <tr>
                                                            <td>{activity.status}</td>
                                                            <td>{activity.time}</td>
                                                            <td>{
                                                                new Date(activity.prescribedTo._seconds * 1000).toLocaleDateString("pt-BR")
                                                                //+ " " + new Date(activity.updatedAt.seconds * 1000).toTimeString().slice(0, 5)
                                                            }
                                                            </td>
                                                            <td>{
                                                                (activity.statusChangedAt != null) ?
                                                                    new Date(activity.statusChangedAt._seconds * 1000).toLocaleString("pt-BR") :
                                                                    "---"
                                                            }</td>
                                                        </tr>

                                                    ))
                                                    ) : null}
                                            </tbody>
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
