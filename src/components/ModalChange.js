import React from 'react';
import {
    Paper,
    Typography,
    Select,
    Input,
    InputLabel,
    FormControl
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const ModalChange = ({ uid, patientId, name }) => {
    const style = makeStyles(theme => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%',

        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'solid',
            color: '#027DB4',
            borderWidth: 'thin',
            padding: 20
        },
        title: {
            fontFamily: 'Quicksand'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150,
        },
    }))
    const classes = style();
    const [age, setAge] = React.useState('');
    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Typography variant="h5" className={classes.title}>Associar Paciente</Typography>
                <Typography variante="subtitle1" style={{color: '#122740'}}>Selecione o fisioterapeuta que deseja associar ao(a) paciente {name}</Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="input-select">Fisioterapeuta</InputLabel>
                    <Select
                        native
                        value={age}
                        onChange={() => { }}
                        input={<Input id="input-select" />}
                    >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
            </Paper>
        </div>
    )
}

export default ModalChange;