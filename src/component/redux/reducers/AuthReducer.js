import { LOGGED_IN, LOGGED_OUT } from '../../config';

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return (state = action.payload);

    case LOGGED_OUT:
      return (state = action.payload);
    default:
      return state;
  }
};

export default AuthReducer;
