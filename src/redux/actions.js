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
  SET_STREAK,
  SET_GOAL,
  SET_LOADING,
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

export const setResult = result => ({
  type: SET_RESULT,
  payload: result,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

export const toggleChallenge = (key, token, username) => (
  dispatch,
  getState
) => {
  dispatch({
    type: TOGGLE_CHALLENGE,
    payload: key,
  });
  const state = getState();
  if (state.challenges.every(ch => ch.isDone)) {
    dispatch(setLoading(true));
    if (token && username) {
      const date = new Date(new Date() - 7200000);
      const dateStr = date.toISOString().slice(0, 10);
      fetch(`${process.env.REACT_APP_API_URL}/setResult`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
        },
        body: JSON.stringify({
          dateStr,
          result: "success",
          username,
        }),
      })
        .then(resp => resp.json())
        .then(resp => {
          dispatch(setResult("success"));
          dispatch(getStreak(token, resp.username));
          dispatch(setStep("end"));
        })
        .catch(console.log);
    } else {
      dispatch(setResult("success"));
      dispatch(setStep("end"));
    }
    dispatch(setLoading(false));
  }
};

export const getUser = (id, token) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
  })
    .then(resp => resp.json())
    .then(resp => {
      dispatch({
        type: LOG_IN,
        payload: resp,
      });
      const { username, id } = resp;
      dispatch(getUserImage(token, username));
      dispatch(getStreak(token, username));
      dispatch(getGoals(token, username));
      dispatch(resetChallenges());
      dispatch(setStep("set"));
      dispatch(fetchChallenges(id, token, username));
    })
    .then(() => dispatch(setLoading(false)))
    .catch(console.log);
};

export const getUserImage = (token, username) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/getUserImage/${username}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
  })
    .then(resp => resp.json())
    .then(resp => {
      dispatch({
        type: SET_PROFILE_IMAGE,
        payload: resp.url,
      });
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log(err);
    });
};

export const setProfileImage = (token, username, url) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/setUserImage`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
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
  fetch(`${process.env.REACT_APP_API_URL}/updateUserImage`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
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

export const fetchChallenges = (id, token) => dispatch => {
  const date = new Date(new Date() - 7200000);
  const dateStr = date.toISOString().slice(0, 10);
  fetch(`${process.env.REACT_APP_API_URL}/getChallenges`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,

      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
    body: JSON.stringify({
      id,
      dateStr,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp === "Invalid request" || resp === "Unable to fetch challenges") {
        console.log(resp);
      } else if (resp[0] && resp !== "No todays challenges") {
        if (resp.every(ch => ch.isDone)) {
          dispatch({
            type: SET_RESULT,
            payload: "success",
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

export const getStreak = (token, username) => dispatch => {
  const date = new Date(new Date() - 7200000);
  const dateStr = date.toISOString().slice(0, 10);
  fetch(`${process.env.REACT_APP_API_URL}/getStreak`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
    body: JSON.stringify({
      dateStr,
      username,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (typeof resp != "object" && resp !== "Unable to fetch user streak") {
        dispatch({ type: SET_STREAK, payload: resp });
      } else {
        console.log(resp);
      }
    })
    .catch(err => console.log(err));
};

export const setGoal = (token, username, goal) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/setGoal`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
    body: JSON.stringify({
      username,
      goal,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp !== "Unable to save goal") {
        dispatch({
          type: SET_GOAL,
          payload: resp[0],
        });
      } else {
        console.log(resp);
      }
    })
    .catch(err => console.log(err));
};

export const getGoals = (token, username) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/getGoals`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
    body: JSON.stringify({
      username,
    }),
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp !== "Unable to fetch goals") {
        resp.forEach(g => {
          dispatch({
            type: SET_GOAL,
            payload: g,
          });
        });
      } else {
        console.log(resp);
      }
    })
    .catch(err => console.log(err));
};

export const saveChallenges = (user, challenges) => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL}/saveChallenges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
      "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_ORIGIN}`,
    },
    body: JSON.stringify({
      user,
      challenges,
    }),
  })
    .then(() => {
      dispatch(setStep("start"));
    })
    .catch(err => console.log(err, "Unable to save challenges"));
};
