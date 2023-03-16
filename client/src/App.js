import React from 'react';
// import dotenv from 'dotenv';
import { Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

// dotenv.config();

const App = () => {
  return (
    <GoogleOAuthProvider clientId='828745331376-g7g5ntb9d3k3c9dfoo64392e98d5v06g.apps.googleusercontent.com'>
      <BrowserRouter>
        <Container maxwidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}
export default App;
