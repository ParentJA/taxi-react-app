import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap'

import TripMedia from './TripMedia';
import { getTrip } from '../services/TripService';

function RiderDetail ({ match }) {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const loadTrip = async (id) => {
      const { response, isError } = await getTrip(id);
      if (isError) {
        setTrip(null);
      } else {
        setTrip(response.data);
      }
    }
    loadTrip(match.params.id);
  }, [match]);

  let tripMedia;

  if (trip === null) {
    tripMedia = <>Loading...</>;
  } else {
    tripMedia = (
      <TripMedia
        trip={trip}
        otherGroup='driver'
      />
    )
  }

  return (
    <Row>
      <Col lg={12}>
        <div className='mb-3' data-cy='trip-card'>
          <h1>Trip</h1>
          {tripMedia}
        </div>
      </Col>
    </Row>
  );
}

export default RiderDetail;