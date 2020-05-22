import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isRider } from '../services/AuthService';

function RiderRoute ({ component: Component, ...rest }) {
  return (
    <Route 
      {...rest}
      render={(props) => {
        if (isRider()) {
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

export default RiderRoute;
