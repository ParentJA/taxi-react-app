import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { webSocket } from 'rxjs/webSocket';

import Map from './Map';
import { getAccessToken, getUser } from '../services/AuthService';

function RiderRequest (props) {
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);

  const [lat, setLat] = useState(38.897957);
  const [lng, setLng] = useState(-77.036560);

  const onSubmit = (values, actions) => {
    const rider = getUser();
    const token = getAccessToken();
    const ws = webSocket(`ws://localhost:8080/taxi/?token=${token}`);
    ws.subscribe();
    ws.next({
      type: 'create.trip',
      data: {
        pick_up_address: values.pickUpAddress,
        drop_off_address: values.dropOffAddress,
        rider: rider.id
      }
    });
    setSubmitted(true);
  };

  if (isSubmitted) {
    return <Redirect to='/rider' />
  }

  return (
    <Row>
      <Col lg={12}>
        <h1>Request trip</h1>
        <Formik
          initialValues={{
            pickUpAddress: '',
            dropOffAddress: ''
          }}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            isSubmitting,
            values
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId='pickUpAddress'>
                <Form.Label>Pick up address:</Form.Label>
                <Form.Control
                  data-cy='pick-up-address'
                  name='pickUpAddress'
                  onChange={handleChange}
                  values={values.pickUpAddress}
                  required
                />
              </Form.Group>
              <Map
                lat={lat}
                lng={lng}
                zoom={13}
                pickUpAddress={values.pickUpAddress}
                dropOffAddress={values.dropOffAddress}
              />
              <Form.Group controlId='dropOffAddress'>
                <Form.Label>Drop off address:</Form.Label>
                <Form.Control
                  data-cy='drop-off-address'
                  name='dropOffAddress'
                  onChange={handleChange}
                  values={values.dropOffAddress}
                />
              </Form.Group>
              <Button
                block
                data-cy='submit'
                disabled={isSubmitting}
                type='submit'
                variant='primary'
              >Submit</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

export default RiderRequest;