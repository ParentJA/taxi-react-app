import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isDriver } from '../services/AuthService';

function DriverRoute ({ component: Component, ...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => {
        if (isDriver()) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={{
            pathname: '/log-in',
            state: { from: props.location }
          }} />
        }
      }}
    />
  );
}

export default DriverRoute;
