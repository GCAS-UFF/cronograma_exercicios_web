import React, { useCallback, useContext, useState } from 'react';
import { withRouter } from "react-router-dom";
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GoogleFontLoader from 'react-google-font-loader';
import {
    NoSsr,
    Divider,
    TextField,
    Typography,
    IconButton,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox 
} from '@material-ui/core'

import NavBar from '../../components/NavBar';
import Button from '../../components/Button'
import fire from '../../services/fire';
import { AuthContext } from "../../services/auth";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        color: '#027DB4',
    },
    card: {
        width: '60%',
        borderRadius: 16,
        marginTop: 30,
        boxShadow: '0 5px 5px 0 #027DB4',
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    header: {
        fontFamily: 'Barlow, san-serif',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headline: {
        color: '#122740',
        fontSize: '1rem',
        fontWeight: 600,
    },
    link: {
        color: '#2281bb',
        padding: '0 0.25rem',
        fontSize: '0.875rem',
    },
    actions: {
        color: '#BDC9D7'
    },
    title: {
        fontFamily: 'Quicksand',
        fontWeight: 500,
    },
    divider: {
        margin: '0 20px',
        backgroundColor: '#d9e2ee',
    }
}));

const Register = props => {
    const { userId, userName } = props
    const styles = useStyles();
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');
    return (
        <>
            <NavBar />
            <div className={styles.root}>
                <Typography variant="h5" className={styles.title}>Cadastrar exercício</Typography>
                <NoSsr>
                    <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
                </NoSsr>
                <Column p={0} gap={0} className={styles.card}>
                    <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
                        <Item stretched className={styles.headline}>Paciente: Daiane</Item>
                    </Row>
                    <form onSubmit={() => { }}>
                        <Row wrap p={2} alignItems={'baseline'}>
                            <TextField id="outlined-basic" label="Titulo" variant="outlined" />
                        </Row>
                        <Row wrap p={2} alignItems={'baseline'}>
                            <Column p={0} gap={0}>
                                <TextField
                                    id="date"
                                    label="Data Início"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Column>
                            <Column p={0} gap={0}>
                                <TextField
                                    id="date"
                                    label="Data Fim"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Column>
                        </Row>
                        <Row wrap p={2} alignItems={'baseline'}>
                            <Column p={0} gap={0}>
                                <TextField
                                    id="time"
                                    label="Duração"
                                    type="time"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }} />
                            </Column>
                            <Column p={0} gap={0}>
                                <TextField
                                    id="time"
                                    label="Repetições"
                                    type="number"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Column>
                        </Row>
                        <Row wrap p={2} alignItems={'baseline'}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {
                                        ["07", "08", "09", "10", "11"].map( hour =>
                                            <FormControlLabel
                                            control={<Checkbox onChange={() => {}} name="gilad" />}
                                            label={hour+":00"}
                                        />
                                        )
                                    }
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {
                                        ["12", "13", "14", "15", "16"].map( hour =>
                                            <FormControlLabel
                                            control={<Checkbox onChange={() => {}} name="gilad" />}
                                            label={hour+":00"}
                                        />
                                        )
                                    }
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {
                                        ["17", "18", "19", "20", "21"].map( hour =>
                                            <FormControlLabel
                                            control={<Checkbox onChange={() => {}} name="gilad" />}
                                            label={hour+":00"}
                                        />
                                        )
                                    }
                                </FormGroup>
                            </FormControl>
                        </Row>
                        <Row wrap p={2} alignItems={'baseline'}>
                        <Button loading={loading} disabled={disabled} value="Cadastrar"/>
                        </Row>
                    </form>
                </Column>
            </div>
        </>
    )
}

export default withRouter(Register);