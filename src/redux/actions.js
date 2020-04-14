// ACTION - AN OBJECT DESCRIBING WHAT HAPPENED

import {
  LOG_IN,
  LOG_OUT,
  SET_ROUTE,
  ADD_CHALLENGE,
  REMOVE_CHALLENGE,
  SET_STEP,
  DO_CHALLENGE,
  EDIT_CHALLENGE,
  RESET_CHALLENGES
} from "./constants";

export const addChallenge = (challenge, key) => ({
  type: ADD_CHALLENGE,
  payload: [challenge, key]
});

export const removeChallenge = (key) => ({
  type: REMOVE_CHALLENGE,
  payload: key
});

export const editChallenge = (newChall, key) => ({
  type: EDIT_CHALLENGE,
  payload: [newChall, key]
});

export const doChallenge = (key) => ({
  type: DO_CHALLENGE,
  payload: key
});

export const resetChallenges = (key) => ({
  type: RESET_CHALLENGES
});

export const setRoute = route => ({
  type: SET_ROUTE,
  payload: route
});

export const setStep = step => ({
  type: SET_STEP,
  payload: step
});

export const logIn = user => ({
  type: LOG_IN,
  payload: user
});

export const logOut = boolean => ({
  type: LOG_OUT
});


