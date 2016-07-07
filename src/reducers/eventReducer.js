import * as types from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case types.EVENT_SELECTED:
      return action.payload;

    case types.UPDATE_EVENT:
       console.log('in reducer');
       console.log(action.payload);
      return Object.assign({}, action.payload);

    default:
      return state;
  }
}
