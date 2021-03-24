import React, { useState, useEffect, useContext } from 'react';
import cx from 'clsx';
import GoogleFontLoader from 'react-google-font-loader';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import SettingsIcon from '@material-ui/icons/Settings';
import fire from '../../services/fire';
import { AuthContext } from "../../services/auth";

import {
  NoSsr,
  Divider,
  Typography,
  IconButton
} from '@material-ui/core'

import NavBar from '../../components/NavBar';
import ConfirmationDialogRaw from '../../components/ConfirmationDialogRaw';

const usePersonStyles = makeStyles(() => ({
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#122740',
  },
  caption: {
    fontSize: '0.875rem',
    color: '#758392',
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

const PersonItem = ({ name, patientId, uid }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState('');
  const { currentUser } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Função atrelada ao botão de cancel do componente ConfirmationDialogRaw para fechá-lo.
   */
  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = (newValue) => {    
    if (newValue) {
      setValue(newValue);
    }
    const db = fire.firestore();
    db.collection("users")//.where("fisioId", "==", currentUser.uid)
    .where("userId", "==", patientId)
    .get()
    .then(querySnapshot => {querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
      db.collection("users").doc(doc.id).update({fisioId: newValue});
      setOpen(false);
      window.location.reload();
  });})
  };
  const styles = usePersonStyles();
  const StyledIconButton = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: '#027DB4',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
      '&:hover': {
        backgroundColor: '#e5f2f7'
      }
    }
  }))(IconButton);
  return (
    <Row gap={0} p={2}>
      <Row wrap grow gap={0} minWidth={0}>
        <Item grow minWidth={0} key={patientId}>
          <div className={cx(styles.name, styles.text)}>{name}</div>
        </Item>
        <Item position={'middle'} key={patientId+'same    '}>
          <StyledIconButton className={styles.btn} variant={'outlined'}
            aria-controls="manage-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleOpen}>
            <SettingsIcon style={{ color: '#027DB4' }} fontSize="small" />
          </StyledIconButton>
          <div>
            <ConfirmationDialogRaw
              classes={{
                paper: styles.paper,
              }}
              id="manage-menu"
              keepMounted
              open={open}
              onClose={handleClose}
              onCancel={handleCancel}
              value={value}
              name={name}
              uid={uid} 
              patientId={patientId}
            />
          </div>
        </Item>
      </Row>
    </Row>
  );
};

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
    width: '80%',
    borderRadius: 16,
    marginTop: 30,
    boxShadow: '0 5px 5px 0 #027DB4',
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  header: {
    fontFamily: 'Barlow, san-serif',
    backgroundColor: '#fff',
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
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

const Manage = React.memo(function Manage() {
  const { currentUser } = useContext(AuthContext);
  const [patients, setPatients] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const db = fire.firestore();
      db.collection("users").where("userId", "!=", currentUser.uid)
        .get()
        .then(
          querySnapshot => {
            setPatients(querySnapshot.docs.map(doc => ({ ...doc.data() })));
          });
    };
    fetchData();
  }, [currentUser.uid]);
  const styles = useStyles();
  return (
    <>
      <NavBar />
      <div className={styles.root}>
        <Typography variant="h5" className={styles.title}>Gerenciar Pacientes</Typography>
        <NoSsr>
          <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
        </NoSsr>
        <Column p={0} gap={0} className={styles.card}>
          <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
            <Item stretched className={styles.headline}>Meus Pacientes</Item>
          </Row>
          {patients.filter(
            option =>
              option.fisioId === currentUser.uid || option.fisioId === null
          ).map(
            patient =>
              <div>
                <PersonItem name={patient.name} patientId={patient.userId} uid={currentUser.uid} />
                <Divider variant={'middle'} className={{ root: styles.divider }} />
              </div>
          )}
          {/* <PersonItem name={'Amber Matthews'} friendCount={6} src={'https://i.pravatar.cc/300?img=10'} />
        
        <PersonItem name={'Russel Robertson'} friendCount={2} src={'https://i.pravatar.cc/300?img=20'} />
        <Divider variant={'middle'} className={{root: styles.divider}} />
        <PersonItem name={'Kathleen Ellis'} friendCount={2} src={'https://i.pravatar.cc/300?img=30'} /> */}
        </Column>
      </div>
    </>
  );
});

export default Manage;