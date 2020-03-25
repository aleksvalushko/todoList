import React from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./redux/reducer";
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import {authReducer} from "./redux/authReducer";

let reducers = combineReducers({
   reducer: todolistReducer,
   auth: authReducer,
   form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;