import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DriverDashboard from './DriverDashboard';
import DriverDetail from './DriverDetail';

function Driver (props) {
  return (
    <Switch>
      <Route path='/driver/:id' component={DriverDetail} />
      <Route component={DriverDashboard} />
    </Switch>
  );
}

export default Driver;