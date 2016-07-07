import axios from 'axios';
import * as types from './types';

// TODO:  move this to config file?
const ROOT_URL = 'http://localhost:3090';

export function selectEvent(event) {
  return {
    type: types.EVENT_SELECTED,
    payload: event
  };
}

export function fetchEvents() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/events`)
      .then(response => {
        dispatch({
          type: types.FETCH_EVENTS,
          payload: response.data
        });
      });
  }
}

export function updateEvent(event) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/events/${event._id}`, event)
      .then(response => {
        dispatch({
          type: types.UPDATE_EVENT,
          payload: event
        });
      });
  }
}
