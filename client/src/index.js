import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { promiseMiddleware } from "./middleware";
import { loadToken, decodeToken } from "./stateStorage";
import agent from "./agent";

//initial redux store state, before any request or action
const initialState = {
  posts: agent.getJSON("/"),
  token: loadToken(),
  user: decodeToken(loadToken())
};

//the store reducer, takes an action that has a type (string value) that defines what
//kind of action you want to do with the store's state, and a payload
//that contains data to save
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
      break;
    case "LOGIN_SUBMIT":
      return { ...state, token: action.payload };
      break;
    case "SET_USER":
      return { ...state, user: action.payload };
      break;
    case "LOGOUT":
      return { ...state, token: null, user: null };
      break;
    default:
      return state;
  }
};

//applyMiddleware function is needed, so actions go through that function before they enter
//the reducer's logic
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

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
