import { SIGN_IN, SET_CHALLENGE, REMOVE_CHALLENGE, START_THE_GAME, END_THE_GAME, DO_CHALLENGE } from './constants';


export const setChallenge = (challenge, key) => ({
    type: SET_CHALLENGE,
    payload: [challenge, key]
})

export const removeChallenge = key => ({
    type: REMOVE_CHALLENGE,
    payload: key
})

export const startTheGame = chall => ({
    type: START_THE_GAME,
    payload: false
})

export const endTheGame = () => ({
    type: END_THE_GAME,
    payload: false
})

export const doChallenge = key => ({
    type: DO_CHALLENGE,
    payload: key
})

export const signIn = isTrue => ({
    type: SIGN_IN,
    payload: isTrue
})