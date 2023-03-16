import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

import Icon from './Icon';
// Custom Component for input
import Input from './Input';

import { AUTH } from '../../constants/actionTypes';

// Styles
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(0);
    const [isSignUp, setIsSignUp] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    
    const googleSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        // console.log(decoded);
        // const result = res?.profileObj;
        // const token = res?.tokenId;
    
        try {
            dispatch({
                type: AUTH,
                data: decoded
            });

            history.push('/');
        } catch (error) {
           console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Something Went Wrong");
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignUp( (prevIsSignUp) => !prevIsSignUp );
        handleShowPassword(0);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> 
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp ? <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> : null }
                    </Grid>
                    <Button type="button" fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already Have and Account? Sign In" : "Don't Have an Account? Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth

