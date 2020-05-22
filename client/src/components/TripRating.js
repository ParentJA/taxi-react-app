import React, { useState } from 'react';
import { Form, Formik, useField } from 'formik';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import Rating from 'react-rating';
import { Redirect } from 'react-router-dom';

import { setRating } from '../services/TripService';

function StarRating (props) {
  const [, meta, helpers] = useField(props);
  const [rating, setRating] = useState(meta.initialValue);

  const handleChange = (value) => {
    helpers.setValue(value);
    setRating(value);
  };

  return (
    <Rating 
      emptySymbol={(<FontAwesomeIcon icon={faStarEmpty} size='3x' />)} 
      fullSymbol={(<FontAwesomeIcon icon={faStarFull} size='3x' />)} 
      initialRating={rating} 
      onChange={handleChange}
    />
  );
}

function TripRating ({ location, match }) {
  const [isSubmitted, setSubmitted] = useState(false);
  const { trip, user } = location.state;

  const onSubmit = async (values, actions) => {
    try {
      await setRating(match.params.id, values.rating);
      setSubmitted(true);
    }
    catch (error) {
      console.error(error);
    }
  };

  if (isSubmitted) {
    return <Redirect to='/rider' />
  }

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <Card.Header>Rating</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                rating: 1
              }}
              onSubmit={onSubmit}
            >
              {(props) => (
                <>
                  <img 
                    alt={user} 
                    className='rounded mx-auto d-block'
                    src={user.photo}
                    width={80}
                    height={80}
                  />
                  <p className='text-center'>
                    {user.first_name}<br />
                    <Moment format='dddd'>{user.created}</Moment> to {trip.drop_off_address}
                  </p>
                  <Form>
                    <StarRating name='rating' />
                    <Button block type='submit' variant='primary'>Submit</Button>
                  </Form>
                </>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TripRating;
