// ACTION - AN OBJECT DESCRIBING WHAT HAPPENED

import {
  LOG_IN,
  LOG_OUT,
  SET_ROUTE,
  ADD_CHALLENGE,
  REMOVE_CHALLENGE,
  SET_STEP,
  TOGGLE_CHALLENGE,
  EDIT_CHALLENGE,
  RESET_CHALLENGES,
  FETCH_CHALLENGES,
  SET_RESULT
} from "./constants";

export const addChallenge = (challenge, key, date) => ({
  type: ADD_CHALLENGE,
  payload: [challenge, key, date]
});

export const removeChallenge = (key) => ({
  type: REMOVE_CHALLENGE,
  payload: key
});

export const editChallenge = (newChall, key) => ({
  type: EDIT_CHALLENGE,
  payload: [newChall, key]
});

export const toggleChallenge = (key) => ({
  type: TOGGLE_CHALLENGE,
  payload: key
});

export const resetChallenges = () => ({
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

export const logOut = () => ({
  type: LOG_OUT
});

export const fetchChallenges = challenges => ({
  type: FETCH_CHALLENGES,
  payload: challenges
});

export const setResult = result => ({
  type: SET_RESULT,
  payload: result
});


