import { combineReducers } from 'redux';
import scoutsReducer from './scoutreducer';
import flavorsReducer from './flavorsreducer';

const rootReducer = combineReducers({
  scouts: scoutsReducer,
  flavors: flavorsReducer,
});

export default rootReducer;