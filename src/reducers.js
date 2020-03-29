import { SET_CHALLENGE, REMOVE_CHALLENGE, START_THE_GAME, END_THE_GAME, DO_CHALLENGE } from "./constants";

const initialState = {
  step: "set",
  challenges: []
};

export const setChallenges = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CHALLENGE:
      return Object.assign({}, state, {
        challenges: [...state.challenges.slice(0), {[`${action.payload}`] : "to-do"}]
      });
    case REMOVE_CHALLENGE:
      return Object.assign({}, state, {
        challenges: [...state.challenges.filter(ch => !ch[action.payload.target.innerHTML])]
      });
    default:
      return state;
  }
};

export const setStep = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_THE_GAME:
      return Object.assign({}, state, {
        step: "start"
      });
      case END_THE_GAME:
      return Object.assign({}, state, {
        step: "end"
      });
    default:
      return state;
  }
};
