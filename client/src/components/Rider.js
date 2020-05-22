import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RiderDashboard from './RiderDashboard';
import RiderRequest from './RiderRequest';
import RiderTrip from './RiderTrip';

function Rider (props) {
  return (
    <Switch>
      <Route path='/rider/request' component={RiderRequest} />
      <Route path='/rider/:id' component={RiderTrip} />
      <Route component={RiderDashboard} />
    </Switch>
  )
}

export default Rider;