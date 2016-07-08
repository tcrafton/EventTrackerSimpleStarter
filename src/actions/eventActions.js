import axios from 'axios';
import * as types from './types';

// TODO:  move this to config file?
const ROOT_URL = 'http://localhost:3090';

function geoCodeAddress(address) {
  let geocoder = new google.maps.Geocoder();
  return new Promise(function(resolve, reject) {
    geocoder.geocode({ 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
}


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
    geoCodeAddress(event.zipcode)
    .then(function(results) {
      console.log(results[0].geometry.location.lat());
      let newLat = results[0].geometry.location.lat();
      let newLon = results[0].geometry.location.lng();
      let newEvent = Object.assign({}, event, {lat: newLat}, {lon: newLon});
      //console.log(event);
      console.log(newEvent);
        axios.put(`${ROOT_URL}/events/${event._id}`, newEvent)
          .then(response => {
            dispatch({
              type: types.UPDATE_EVENT,
              payload: newEvent
            });
          });
    })
    .catch(function(status) {
      console.log(status);
    });
  }
}
