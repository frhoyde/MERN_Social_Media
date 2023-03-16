import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

import useStyles from "./styles";
import memories from "../../images/memories.png";


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // console.log(user);

    const logOut = () => {
        dispatch({ type: LOGOUT })

        history.push('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.sub;

        // JWT 

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainers}>
                <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height={60}/>
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? ( 
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logOut}>Log Out</Button>
                    </div>
                ): (
                        <Button component={Link} to="/auth" variant='contained'  color="primary">Log In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;