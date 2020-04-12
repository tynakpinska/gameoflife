// ACTION - AN OBJECT DESCRIBING WHAT HAPPENED

import {
  LOG_IN,
  LOG_OUT,
  SET_ROUTE,
  SET_CHALLENGE,
  REMOVE_CHALLENGE,
  START_THE_GAME,
  END_THE_GAME,
  DO_CHALLENGE,
  SET_USER
} from "./constants";

export const setChallenge = (challenge, key) => ({
  type: SET_CHALLENGE,
  payload: [challenge, key]
});

export const removeChallenge = (key) => ({
  type: REMOVE_CHALLENGE,
  payload: key
});

export const startTheGame = (chall) => ({
  type: START_THE_GAME,
  payload: false
});

export const endTheGame = () => ({
  type: END_THE_GAME,
  payload: false
});

export const doChallenge = (key) => ({
  type: DO_CHALLENGE,
  payload: key
});

export const setRoute = route => ({
  type: SET_ROUTE,
  payload: route
});

export const logIn = boolean => ({
  type: LOG_IN
});

export const logOut = boolean => ({
  type: LOG_OUT
});

export const setUser = user => ({
  type: SET_USER,
  payload: user
});


