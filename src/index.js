import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { setChallenges, setStep, setRoute, logInAndOut, setUser } from "./reducers";

const rootReducer = combineReducers({setChallenges, setStep, setRoute, logInAndOut, setUser});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
