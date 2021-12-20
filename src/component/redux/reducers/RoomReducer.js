import { LOAD_ROOMS } from '../../config';

const RoomReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ROOMS:
      return (state = action.payload);

    default:
      return state;
  }
};

export default RoomReducer;
