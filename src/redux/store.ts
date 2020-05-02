import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import {todolistReducer} from "./reducer";
import {authReducer} from "./authReducer";

let rootReducers = combineReducers({
   reducer: todolistReducer,
   auth: authReducer,
   form: formReducer
});

export type AppStateType = ReturnType<typeof rootReducers>

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;