// REDUCERS specify how the actions transform the state tree

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
  },
};

export const setChallenges = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CHALLENGE:
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
    case EDIT_CHALLENGE:
      return Object.assign({}, state, {
        challenges: [
          ...state.challenges.map(ch => {
            if (ch.key === action.payload[1]) {
              return {
                name: `${action.payload[0]}`,
                key: `${action.payload[1]}`,
                isDone: false,
              };
            } else {
              return ch;
            }
          }),
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
      case RESET_CHALLENGES:
      return Object.assign({}, state, {
        challenges: []
      });
    default:
      return state;
  }
};

export const setStep = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STEP:
      return Object.assign({}, state, {
        step: action.payload,
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
        user: action.payload
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        isLoged: false,
        user: {
          id: "",
          username: "",
          email: "",
          joined: "",
        },
      });
    default:
      return state;
  }
};