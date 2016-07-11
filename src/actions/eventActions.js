import axios from 'axios';
import * as types from './types';

// TODO:  move this to config file?
const ROOT_URL = 'http://localhost:3090';

function geoCodeAddress(address) {
  let geocoder = new google.maps.Geocoder();
  return new Promise(function(resolve, reject) {
    geocoder.geocode({ 'address': address.zipcode.toString() }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
}

function checkAddress(formAddress, geoAddress){
  // get the values returned from geocode
  let geoZip = geoAddress[0]['address_components'][0]['long_name'];
  let geoCity = geoAddress[0]['address_components'][1]['long_name'];
  // the state can be in either slot 2 or 3, think this depends on the size of the area searched
  let geoState = {
      val1: geoAddress[0]['address_components'][2]['short_name'],
      val2: geoAddress[0]['address_components'][3]['short_name']
    }

  // get the form values
  let formZip = formAddress['zipcode'];
  let formCity = formAddress['city'];
  let formState = formAddress['state'];

  // compare the zip code on the form to the zip code returned from the geocode
  if(geoZip.toString() !== formZip.toString()) {
    throw('Check Address');
  }

  // compare the city on the form to the city returned from geocode
  if(geoCity !== formCity) {
    throw('Check Address');
  }

  // compare the state on the form to the state returned from the geocode
  if (geoState.val1 !== formState && geoState.val2 !== formState) {
    throw('Check Address');
  }

  return true;
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
    geoCodeAddress(event)
    .then(function(address) {
      // Need to see if the address makes sense
      if(checkAddress(event, address)) {
        return address;
      } else {
        return false;
      }
      return address;
    })
    .then(function(results) {
      let newLat = results[0].geometry.location.lat();
      let newLon = results[0].geometry.location.lng();
      let newEvent = Object.assign({}, event, {lat: newLat}, {lon: newLon});
      axios.put(`${ROOT_URL}/events/${event._id}`, newEvent)
        .then(response => {
          dispatch({
            type: types.UPDATE_EVENT,
            payload: newEvent
          });
        });
    })
    .catch(function(status) {
      dispatch(eventError(status));
    });
  }
}

export function eventError(error) {
  return {
    type: types.EVENT_ERROR,
    payload: error
  };
}
