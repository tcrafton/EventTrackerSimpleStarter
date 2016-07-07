import * as types from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case types.EVENT_SELECTED:
      return action.payload;
    case types.UPDATE_EVENT:
      return action.payload;
    default:
      return state;
  }
}
