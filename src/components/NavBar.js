import React, { useContext, useState } from 'react';
import fire from '../services/fire';
import { AuthContext } from "../services/auth";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home'

export default function NavBar() {

  const { currentUser } = useContext(AuthContext);

  const sair = () => {
    fire.auth().signOut()
    window.location.reload(false);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const style = makeStyles((theme) => ({
    menuBar: {
      backgroundColor: '#ffffff',
      display: 'flex',
      color: '#027DB4',
      position: 'static',
      boxShadow: '0px 2px 4px -1px #027DB4, 0px 4px 5px 0px #ffffff, 0px 1px 10px 0px #027DB4',
    },
    title: {
      whiteSpace: 'nowrap',
      fontFamily: 'Quicksand'
    },
  }))
  const classes = style();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log('anchor1 ', anchorEl)
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #027DB4',
    },
  })((props) => (
    <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
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
    },
  }))(MenuItem);
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
  const StyledButton = withStyles(theme => ({
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
  }))(Button)
  return (
    <AppBar className={classes.menuBar}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StyledIconButton color="inherit" aria-label="menu" syze="small" style={{
            display: 'flex', justifyContent: 'center', width: 70
          }}
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleClick}>
            <MenuIcon style = {{color: '#027DB4'}}/>
          </StyledIconButton>
            <div>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                disableAutoFocusItem
              >
                <StyledMenuItem
                  component={Link}
                  onClick={handleClose}
                  to="/main">
                  <ListItemIcon>
                    <HomeIcon style = {{color: '#027DB4'}} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Página Inicial" />
                </StyledMenuItem>
                <StyledMenuItem
                  component={Link}
                  onClick={handleClose}
                  to="/manage">
                  <ListItemIcon>
                    <SettingsIcon style = {{color: '#027DB4'}} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Gerenciar Pacientes" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          <Typography variant="h5" align="justify" className={classes.title}>
            Cronograma exercícios
          </Typography>
        </div>
        {currentUser ?
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" className={classes.title}>Bem vindo(a) {currentUser.displayName == null ? currentUser.email : currentUser.displayName}!</Typography>
            <StyledButton color="inherit" onClick={sair}>Sair</StyledButton>
          </div>
          : null}
      </Toolbar>
    </AppBar>
  );
}
