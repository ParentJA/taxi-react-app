import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { webSocket } from 'rxjs/webSocket';

import TripCard from './TripCard';
import { getAccessToken } from '../services/AuthService';
import { getTrips } from '../services/TripService';

function RiderDashboard (props) {
  const [trip, setTrip] = useState(undefined);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    }
    loadTrips();
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    const ws = webSocket(`ws://localhost:8080/taxi/?token=${token}`);
    const subscription = ws.subscribe((message) => {
      setTrips(prevTrips => [
        ...prevTrips.filter(trip => trip.id !== message.data.id),
        message.data
      ]);
      updateToast(message.data);
      setTrip(message.data);
    });
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const getCurrentTrips = () => {
    return trips.filter(trip => {
      return (
        trip.driver !== null &&
        trip.status !== 'REQUESTED' &&
        trip.status !== 'COMPLETED'
      );
    });
  };

  const getCompletedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  };

  const updateToast = (trip) => {
    if (trip.status === 'STARTED') {
      toast.info(`Driver ${trip.driver.username} is coming to pick you up.`);
    } else if (trip.status === 'IN_PROGRESS') {
      toast.info(`Driver ${trip.driver.username} is headed to your destination.`);
    } else if (trip.status === 'COMPLETED') {
      toast.info(`Driver ${trip.driver.username} has dropped you off.`);
    }
  };

  if (trip && trip.status === 'COMPLETED') {
    return <Redirect to={{
      pathname: `/rider/${trip.id}/rating`,
      state: {
        trip: trip,
        user: trip.driver
      }
    }} />;
  }

  return (
    <Row>
      <Col lg={12}>
        <h1>Trips</h1>
        <TripCard
          title='Current Trip'
          trips={getCurrentTrips()}
          group='rider'
          otherGroup='driver'
        />
        <TripCard
          title='Recent Trips'
          trips={getCompletedTrips()}
          group='rider'
          otherGroup='driver'
        />
      </Col>
    </Row>
  );
}

export default RiderDashboard;