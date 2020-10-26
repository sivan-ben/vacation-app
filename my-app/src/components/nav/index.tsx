import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { routes } from '../appRouters/routers.config'
import { AppLinks } from "../appRouters/index";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const user = useSelector((state: any) => state.user);
    const admin = useSelector((state: any) => state.isAdmin);
    const userOnline = localStorage.getItem("token") 
   
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {user && `hello ${user.first_name}`}
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    ></IconButton>

                    {admin && <NavLink to='/addVacation'>
                        <AddCircleIcon fontSize="large" type='button' className='navButton' />
                    </NavLink>}
                    {admin && <NavLink to='/chart'>
                        <EqualizerIcon fontSize="large" type='button' className='navButton' />
                    </NavLink>}
                    {admin && <NavLink to='/admin'>
                        <ArrowBackIcon fontSize="large" type='button' className='navButton' />
                    </NavLink>}
                    {userOnline && <NavLink to='/login'>
                        <HomeIcon fontSize="large" type='button' className='navButton' />
                    </NavLink>}


                    <AppLinks routes={routes} isAdmin />
                </Toolbar>
            </AppBar>
        </div>
    );
}