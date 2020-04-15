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
  RESET_CHALLENGES,
} from "./constants";

const initialState = {
  route: "game",
  step: "set",
  challenges: [],
  user: {},
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
                ...ch,
                name: `${action.payload[0]}`,
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
              return { ...ch, isDone: true };
            } else {
              return ch;
            }
          }),
        ],
      });
    case RESET_CHALLENGES:
      return Object.assign({}, state, {
        challenges: [],
      });
    case LOG_IN:
      return Object.assign({}, state, {
        ...state,
        challenges: [],
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        ...state,
        challenges: [],
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
    case LOG_IN:
      return Object.assign({}, state, {
        ...state,
        step: "set",
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        ...state,
        step: "set",
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
    case LOG_IN:
      return Object.assign({}, state, {
        ...state,
        route: "game",
      });
    default:
      return state;
  }
};

export const logInAndOut = (state = initialState, action = false) => {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        ...state,
        user: action.payload,
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        ...state,
        user: {},
      });
    default:
      return state;
  }
};
