import { SET_CHALLENGE, REMOVE_CHALLENGE, START_THE_GAME, END_THE_GAME, DO_CHALLENGE } from './constants';


export const setChallenge = chall => ({
    type: SET_CHALLENGE,
    payload: chall
})

export const removeChallenge = chall => ({
    type: REMOVE_CHALLENGE,
    payload: chall
})

export const startTheGame = chall => ({
    type: START_THE_GAME,
    payload: false
})

export const endTheGame = () => ({
    type: END_THE_GAME,
    payload: false
})

export const doChallenge = chall => ({
    type: DO_CHALLENGE,
    payload: chall
})