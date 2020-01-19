import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { promiseMiddleware } from './middleware';

//initial redux store state, before any request or action
const initialState = {
    posts:null,
    user:'guest',
    logged:false
}

//the store reducer, takes an action that has a type (string value) that defines what
//kind of action you want to do with the store's state, and a payload
//that contains data to save
const reducer = (state = initialState, action) => {
    switch(action.type){
      //add CHECK_LOG and LOGIN_SUBMIT !important
        case 'GET_POSTS':
            return {...state, posts : action.payload.results}
        default:
        return state;
    }
}

//applyMiddleware function is needed, so actions go through that function before they enter
//the reducer's logic
const store = createStore(reducer, applyMiddleware(promiseMiddleware));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
