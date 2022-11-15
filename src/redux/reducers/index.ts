import { combineReducers } from 'redux';
import characterModalReducer from './characterModalReducer';
import episodeModalReducer from './episodeModalReducer';

export default combineReducers({
  characterModal: characterModalReducer,
  episodeModal: episodeModalReducer,
});
