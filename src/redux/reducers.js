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

import {
  state,
  body,
  bank,
} from "../Components/Routes/Profile/Profile.module.css";

const initialState = {
  route: "game",
  step: "set",
  result: "",
  challenges: [],
  user: {},
  streak: 0,
  isLoading: false,
  goals: [
    {
      title: "State of mind",
      current: "anxious",
      goal: "stoic",
      className: state,
    },
    {
      title: "Body shape",
      current: "BMI 27",
      goal: "BMI 20",
      className: body,
    },
    {
      title: "Bank balance",
      current: "30000$",
      goal: "1000000$",
      className: bank,
    },
  ],
};

export const challenges = (state = initialState.challenges, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHALLENGE:
      return [
        ...state,
        {
          challenge: `${payload[0]}`,
          key: payload[1],
          date: payload[2],
          isDone: false,
        },
      ];
    case EDIT_CHALLENGE:
      return state.map(ch => {
        if (ch.key === payload[1]) {
          return {
            ...ch,
            challenge: `${payload[0]}`,
          };
        } else {
          return ch;
        }
      });
    case REMOVE_CHALLENGE:
      return state.filter(ch => ch.key !== payload);
    case TOGGLE_CHALLENGE:
      return state.map(ch => {
        if (ch.key === payload) {
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
      return [...state, ...payload];
    default:
      return state;
  }
};

export const step = (state = initialState.step, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STEP:
      return payload;
    case LOG_OUT:
      return "set";
    default:
      return state;
  }
};

export const route = (state = initialState.route, action = false) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ROUTE:
      return payload;
    case LOG_IN:
      return "game";
    default:
      return state;
  }
};

export const user = (state = initialState.user, action = false) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_IN:
      return payload;
    case LOG_OUT:
      return {};
    case SET_PROFILE_IMAGE:
      return { ...state, imageUrl: payload };
    default:
      return state;
  }
};

export const result = (state = initialState.result, action = false) => {
  const { type, payload } = action;
  switch (type) {
    case SET_RESULT:
      return payload;
    default:
      return state;
  }
};

export const streak = (state = initialState.streak, action = 0) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STREAK:
      return payload;
    default:
      return state;
  }
};

export const goals = (state = initialState.goals, action = []) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GOAL:
      return state.map(g => (g.title === payload.title ? payload : g));
    default:
      return state;
  }
};

export const isLoading = (state = initialState.isLoading, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};
