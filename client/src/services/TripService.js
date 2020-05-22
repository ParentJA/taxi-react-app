import axios from 'axios';

import { getAccessToken } from './AuthService';

export const getTrip = async (id) => {
  const url = `/api/trip/${id}/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (response) {
    return { response, isError: true };
  }
};

export const getTrips = async () => {
  const url = '/api/trip/';
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (response) {
    return { response, isError: true };
  }
};

export const setRating = async (id, rating) => {
  const url = `/api/trip/${id}/ratings/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.request({
      url,
      method: 'patch',
      headers,
      data: {
        rating_by_rider: rating
      }
    });
    return { response, isError: false };
  } catch (response) {
    return { response, isError: true };
  }
};