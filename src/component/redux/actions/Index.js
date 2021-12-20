import { LOGGED_IN, LOGGED_OUT, LOAD_ROOMS } from '../../config';

export const logIn = (payload) => {
  return {
    type: LOGGED_IN,
    payload: payload,
  };
};

export const logOut = (payload) => {
  return {
    type: LOGGED_OUT,
    payload: payload,
  };
};

export const loadRooms = (payload) => {
  return {
    type: LOAD_ROOMS,
    payload: payload,
  };
};
