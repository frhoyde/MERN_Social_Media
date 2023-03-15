import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

import Icon from './Icon';
// Custom Component for input
import Input from './Input';

// Styles
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    
    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
            dispatch({
                type: "AUTH",
                payload: { result, token }
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
        handleShowPassword(false);
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
                        { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId='Google ID'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_ori"
                    />
                    <Grid container justifyContent='flex-end'>
                        <Button item onClick={switchMode}>
                            {isSignUp ? "Already Have and Account? Sign In" : "Don't Have an Account? Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth