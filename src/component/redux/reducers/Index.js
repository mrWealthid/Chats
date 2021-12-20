import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RoomReducer from './RoomReducer';

const allReducers = combineReducers({
  Auth: AuthReducer,
  Rooms: RoomReducer,
});

export default allReducers;
