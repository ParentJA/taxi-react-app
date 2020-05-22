import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RiderDetail from './RiderDetail';
import TripRating from './TripRating';

function RiderTrip (props) {
  return (
    <Switch>
      <Route path='/rider/:id/rating' component={TripRating} />
      <Route component={RiderDetail} />
    </Switch>
  )
}

export default RiderTrip;