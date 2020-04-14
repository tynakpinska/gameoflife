// REDUCERS specify how the actions transform the state tree

import {
  LOG_IN,
  LOG_OUT,
  SET_ROUTE,
  SET_CHALLENGE,
  REMOVE_CHALLENGE,
  START_THE_GAME,
  END_THE_GAME,
  DO_CHALLENGE,
  SET_USER,
} from "./constants";

const initialState = {
  isLoged: false,
  route: "game",
  step: "set",
  challenges: [],
  user: {
    id: "",
    username: "",
    email: "",
    joined: "",
  }
};

export const setChallenges = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CHALLENGE:
      return Object.assign({}, state, {
        challenges: [
          ...state.challenges.slice(0),
          {
            name: `${action.payload[0]}`,
            key: action.payload[1],
            isDone: false,
          },
        ],
      });
    case REMOVE_CHALLENGE:
      return Object.assign({}, state, {
        challenges: [
          ...state.challenges.filter(ch => ch.key !== action.payload),
        ],
      });
    case DO_CHALLENGE:
      return Object.assign({}, state, {
        challenges: [
          ...state.challenges.map(ch => {
            if (ch.key === action.payload) {
              return { name: ch.name, key: ch.key, isDone: true };
            } else {
              return ch;
            }
          }),
        ],
      });
    default:
      return state;
  }
};

export const setStep = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_THE_GAME:
      return Object.assign({}, state, {
        step: "start",
      });
    case END_THE_GAME:
      console.log("end");
      return Object.assign({}, state, {
        step: "end",
      });
    default:
      return state;
  }
};

export const setRoute = (state = initialState, action = false) => {
  switch (action.type) {
    case SET_ROUTE:
      return Object.assign({}, state, {
        route: action.payload,
      });
    default:
      return state;
  }
};

export const logInAndOut = (state = initialState, action = false) => {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        isLoged: true,
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        isLoged: false,
        user: {
          id: "",
          username: "",
          email: "",
          joined: "",
        }
      });
    default:
      return state;
  }
};

export const setUser = (state = initialState, action = false) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    default:
      return state;
  }
};
