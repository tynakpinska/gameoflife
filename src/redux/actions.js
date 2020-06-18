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
  SET_PROFILE_IMAGE,
  GET_PROFILE_IMAGE,
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

export const toggleChallenge = (key, token, username) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_CHALLENGE,
    payload: key,
  });
  const state = getState();
  if (state.challenges.every(ch => ch.isDone)) {
    setTimeout(() => {
      dispatch(setStep("end"));
      dispatch(setResult("success", token, username));
    }, 1000);
  }
};

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

export const setResult = (result, token, username) => dispatch => {
  fetch(`http://localhost:3000/setResult`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      result,
      username
    })
  })
    .then(resp => resp.json())
    .then(resp => {
      dispatch({
        type: SET_RESULT,
        payload: result,
      })
    })
    .catch(console.log);
}

export const logOut = () => ({
  type: LOG_OUT,
});

export const getUser = (id, token) => dispatch => {
  fetch(`http://localhost:3000/profile/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(resp => resp.json())
    .then(resp => {
      dispatch({
        type: LOG_IN,
        payload: resp,
      });
      fetch(`http://localhost:3000/getUserImage/${resp.username}`, {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then(resp => resp.json())
        .then(resp => {
          dispatch({
            type: GET_PROFILE_IMAGE,
            payload: resp.url,
          });
        })
        .catch(err => console.log(err));
    })
    .catch(console.log);
};

export const setProfileImage = (token, username, url) => dispatch => {
  fetch("http://localhost:3000/setUserImage", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      username,
      url,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp === "Unable to save image") {
        console.log(resp);
      } else if (resp[0]) {
        dispatch({
          type: SET_PROFILE_IMAGE,
          payload: resp[0].url,
        });
      }
    })
    .catch(err => console.log(err));
};

export const updateProfileImage = (token, username, url) => dispatch => {
  fetch("http://localhost:3000/updateUserImage", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      username,
      url,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp === "Unable to update image") {
        console.log(resp);
      } else if (resp[0]) {
        dispatch({
          type: SET_PROFILE_IMAGE,
          payload: resp[0].url,
        });
      }
    })
    .catch(err => console.log(err));
};

export const fetchChallenges = (id, token, username) => dispatch => {
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
        if (resp.every(ch => ch.isDone)) {
          dispatch({
            type: SET_RESULT,
            payload: "success"
          });
          dispatch(setStep("end"));
        } else {
          dispatch(setStep("start"));
        }
        dispatch({
          type: GET_CHALLENGES,
          payload: resp,
        });
      }
    })
    .catch(err => console.log(err));
};
