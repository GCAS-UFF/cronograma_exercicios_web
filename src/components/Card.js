import React, { useEffect, useContext, useState, useMemo } from 'react';
import './Card.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";

import fire from '../services/fire';
import { AuthContext } from "../services/auth";
import api from '../services/api';
import SimpleConfirmationDialog from './SimpleConfirmationDialog';


const Card = props => {
    const { currentUser } = useContext(AuthContext);
    const [exercises, setExercises] = useState([]);
    const [user, setUser] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [chosenExercise, setChosenExercise] = useState(null);

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

    /**
     * Chamada ao firestore para fazer o soft delete do exercício, definindo o campo
     * active como false.
     * @param {object} exercise exercício a ser excluído
     */
    const deleteExercise = async (exercise) => {
        
        try {
            exercise.active = false;
            let now = new Date();

            const db = fire.firestore();
            await db.collection('exercises')
                .doc(exercise.id)
                .update({
                    active: exercise.active, 
                    updatedAt: now, 
                    deletedAt: now,
                    deletedBy: currentUser.uid,
                });
    
            setExercises([...exercises]);
        }
        catch (e) {
            alert('Erro: documento não encontrado');
        }

    };

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
                            <div key={exercise.id}>
                                <div class="activityArea">
                                    <div class="containertitle">
                                        <div class="titleActivityArea">
                                            <p class="titleActivity">{exercise.title}</p>
                                            <p class="durationActivity">
                                                Início: {new Date(exercise.startDate._seconds * 1000).toLocaleDateString("pt-BR") + " " + new Date(exercise.startDate._seconds * 1000).toTimeString().slice(0, 5)
                                                } Fim: {new Date(exercise.endDate._seconds * 1000).toLocaleDateString("pt-BR") + " " + new Date(exercise.endDate._seconds * 1000).toTimeString().slice(0, 5)
                                                }</p>
                                            <p 
                                                className={`activeStatus ${exercise.active ? 'active' : 'inactive'}`}>
                                                {exercise.active ? 'Ativo' : 'Inativo'}
                                            </p>
                                        </div>
                                        
                                        <button 
                                            className="btnDelete"
                                            disabled={!exercise.active || exercise.currentlyUsed}
                                            onClick={(e) =>  {
                                                    setChosenExercise(exercise);
                                                    setDialogOpen(true);
                                                }
                                            }>
                                            <Delete fontSize="small"></Delete>
                                        </button>
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
            <SimpleConfirmationDialog 
                open={dialogOpen}
                title="Desativar exercício"
                message="Tem certeza que deseja desativar o exercício?"
                cancelText="Não"
                confirmText="Sim"
                onConfirm={() => {
                    deleteExercise(chosenExercise);
                    setChosenExercise(null);
                    setDialogOpen(false);
                }}
                onClose={() => {
                    setChosenExercise(null);
                    setDialogOpen(false);
                }}/>
        </div>

    );
}

export default Card;
