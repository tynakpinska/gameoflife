// REDUCERS specify how the actions transform the state tree

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

const initialState = {
  route: "game",
  step: "set",
  result: "",
  challenges: [],
  user: {},
};

export const challenges = (state = initialState.challenges, action = {}) => {
  switch (action.type) {
    case ADD_CHALLENGE:
      return [
        ...state,
        {
          challenge: `${action.payload[0]}`,
          key: action.payload[1],
          date: action.payload[2],
          isDone: false,
        },
      ];
    case EDIT_CHALLENGE:
      return state.map(ch => {
        if (ch.key === action.payload[1]) {
          return {
            ...ch,
            challenge: `${action.payload[0]}`,
          };
        } else {
          return ch;
        }
      });
    case REMOVE_CHALLENGE:
      return state.filter(ch => ch.key !== action.payload);
    case TOGGLE_CHALLENGE:
      return state.map(ch => {
        if (ch.key === action.payload) {
          return { ...ch, isDone: !ch.isDone };
        } else {
          return ch;
        }
      });
    case RESET_CHALLENGES:
      return [];
    case LOG_OUT:
      return [];
    case GET_CHALLENGES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const step = (state = initialState.step, action = {}) => {
  switch (action.type) {
    case SET_STEP:
      return action.payload;
    case LOG_OUT:
      return "set";
    default:
      return state;
  }
};

export const route = (state = initialState.route, action = false) => {
  switch (action.type) {
    case SET_ROUTE:
      return action.payload;
    case LOG_IN:
      return "game";
    default:
      return state;
  }
};

export const user = (state = initialState.user, action = false) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return {};
    case SET_PROFILE_IMAGE:
      return { ...state, imageUrl: action.payload };
    case GET_PROFILE_IMAGE:
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
};

export const result = (state = initialState.result, action = false) => {
  switch (action.type) {
    case SET_RESULT:
      return action.payload;
    default:
      return state;
  }
};
