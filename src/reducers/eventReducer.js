import * as types from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case types.EVENT_SELECTED:
      const addressNumber = {number: action.payload.address.number};
      const street = {street: action.payload.address.street};
      const city = {city: action.payload.address.city};
      const addressState = {state: action.payload.address.state};
      const zip = {zipcode: action.payload.address.zipcode};
      return Object.assign({}, action.payload, addressNumber, street, city, addressState, zip);

    case types.UPDATE_EVENT:
      return Object.assign({}, action.payload);

    case types.EVENT_ERROR:
      return {...state, error: action.payload };

    default:
      return state;
  }
}
