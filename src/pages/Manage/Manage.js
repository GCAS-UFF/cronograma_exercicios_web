import React, {useState} from 'react';
import cx from 'clsx';
import GoogleFontLoader from 'react-google-font-loader';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import SettingsIcon from '@material-ui/icons/Settings';

import {
    NoSsr,
    Divider,
    Link,
    Typography,
    IconButton,
    Modal
  } from '@material-ui/core'

import NavBar from '../../components/NavBar';
import ModalChange from '../../components/ModalChange';

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
}));

const PersonItem = ({ src, name, friendCount }) => {
  const avatarStyles = useDynamicAvatarStyles({ size: 56 });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
      setOpen(true);
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
      '&:hover':{
        backgroundColor: '#e5f2f7'
      }
    }
  }))(IconButton);
  return (
    <Row gap={0} p={2}>
      {/* <Item>
        <Avatar classes={avatarStyles} src={src} />
      </Item> */}
      <Row wrap grow gap={0} minWidth={0}>
        <Item grow minWidth={0}>
          <div className={cx(styles.name, styles.text)}>{name}</div>
          {/* <div className={cx(styles.caption, styles.text)}>
            {friendCount} mutual friends
          </div> */}
        </Item>
        <Item position={'middle'}>
          <StyledIconButton className={styles.btn} variant={'outlined'}
            aria-controls="manage-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleOpen}>
            <SettingsIcon style = {{color: '#027DB4'}} fontSize="small" />
          </StyledIconButton>
          <div>
          <Modal
                id="manage-menu"               
                open={Boolean(open)}
                onClose={handleClose}
                disableAutoFocusItem
              >
                  <ModalChange name={name}/>
              </Modal>
          </div>
        </Item>
      </Row>
    </Row>
  );
};

const useStyles = makeStyles(() => ({
  root:{
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
  const styles = useStyles();
  return (
   <>
    <NavBar/>
    <div className={styles.root}>   
    <Typography variant="h5" className={styles.title}>Gerenciar Pacientes</Typography>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
      </NoSsr>
      <Column p={0} gap={0} className={styles.card}>
        <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
          <Item stretched className={styles.headline}>Meus Pacientes</Item>
          {/* <Item className={styles.actions}>
            <Link className={styles.link}>Refresh</Link> •{' '}
            <Link className={styles.link}>See all</Link>
          </Item> */}
        </Row>
        <PersonItem name={'Amber Matthews'} friendCount={6} src={'https://i.pravatar.cc/300?img=10'} />
        <Divider variant={'middle'} className={{root: styles.divider}} />
        <PersonItem name={'Russel Robertson'} friendCount={2} src={'https://i.pravatar.cc/300?img=20'} />
        <Divider variant={'middle'} className={{root: styles.divider}} />
        <PersonItem name={'Kathleen Ellis'} friendCount={2} src={'https://i.pravatar.cc/300?img=30'} />
      </Column>
    </div>
    </>
  );
});

export default Manage;