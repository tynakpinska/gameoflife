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
  GET_CHALLENGES,
  SET_RESULT,
} from "./constants";

export const addChallenge = (challenge, key, date) => ({
  type: ADD_CHALLENGE,
  payload: [challenge, key, date],
});

export const removeChallenge = key => ({
  type: REMOVE_CHALLENGE,
  payload: key,
});

export const editChallenge = (newChall, key) => ({
  type: EDIT_CHALLENGE,
  payload: [newChall, key],
});

export const toggleChallenge = key => ({
  type: TOGGLE_CHALLENGE,
  payload: key,
});

export const resetChallenges = () => ({
  type: RESET_CHALLENGES,
});

export const setRoute = route => ({
  type: SET_ROUTE,
  payload: route,
});

export const setStep = step => ({
  type: SET_STEP,
  payload: step,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const getUser = id => dispatch => {
  fetch(`http://localhost:3000/profile/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  })
    .then(resp => resp.json())
    .then(resp => {
      dispatch({
        type: LOG_IN,
        payload: resp,
      });
    })
    .catch(console.log);
};

export const fetchChallenges = (id, token) => dispatch => {
  const now = new Date();
  const nowStr = now.toISOString().slice(0, 10);
  fetch("http://localhost:3000/getChallenges", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
      nowStr,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (
        resp === "Invalid request" ||
        resp === "Unable to fetch challenges" ||
        resp === "No todays challenges"
      ) {
        console.log(resp);
      } else if (resp[0]) {
        dispatch({
          type: SET_STEP,
          payload: "start",
        });
        dispatch({
          type: GET_CHALLENGES,
          payload: resp,
        });
      }
    })
    .catch(err => console.log(err));
};

export const setResult = result => ({
  type: SET_RESULT,
  payload: result,
});
