import React, { useState } from 'react';
import axios from 'axios';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { getUser, isDriver, isRider } from './services/AuthService';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Driver from './components/Driver';
import DriverDropdown from './components/DriverDropdown';
import DriverRoute from './components/DriverRoute';
import Rider from './components/Rider';
import RiderDropdown from './components/RiderDropdown';
import RiderRoute from './components/RiderRoute';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App () {
  const [user, setUser] = useState(() => getUser());
  
  const logIn = async (username, password) => {
    const url = '/api/log_in/';
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'taxi.auth', JSON.stringify(response.data)
      );
      setUser(getUser());
      return { response, isError: false };
    }
    catch (error) {
      console.error(error);
      return { response: error, isError: true };
    }
  };

  const logOut = () => {
    window.localStorage.removeItem('taxi.auth');
    setUser(undefined);
  };

  return (
    <>
      <Navbar bg='light' expand='lg' variant='light'>
        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>Taxi</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        {isDriver() && <DriverDropdown logOut={logOut} user={user} />}
        {isRider() && <RiderDropdown logOut={logOut} user={user} />}
      </Navbar>
      <Container className='pt-3'>
        {isDriver() ? (
          <Switch>
            <DriverRoute path='/driver' component={Driver} />
            <Route path='/log-in'>
              <LogIn logIn={logIn} />
            </Route>
            <Route path='/sign-up' component={SignUp} />
            <Redirect from='/' to='/driver' />
          </Switch>
        ) : (
          <Switch>
            <RiderRoute path='/rider' component={Rider} />
            <Route path='/log-in'>
              <LogIn logIn={logIn} />
            </Route>
            <Route path='/sign-up' component={SignUp} />
            <Redirect from='/' to='/rider' />
          </Switch>
        )}
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;