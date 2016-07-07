import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import events from './eventReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  events
});

export default rootReducer;
