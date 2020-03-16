import React from 'react';
import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./redux/reducer";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
   reducer: todolistReducer,
   form: formReducer
});

const store = createStore(reducers);
window.store = store;

export default store;