import React from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./redux/reducer";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from "./redux/authReducer";

let reducers = combineReducers({
   reducer: todolistReducer,
   auth: authReducer,
   form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;