import {authAPI} from "../dal/api";
import {IISAuth} from "../types/types.js";
import {AppStateType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

const SET_AUTH_USER_DATA = 'TodoList/Reducer/SET_AUTH_USER_DATA';

interface ISetAuthUserData {
    type: typeof SET_AUTH_USER_DATA
    payload: IISAuth
}

const setAuthUserData =
    (userId: number | null, email: string | null, login: string | null, isAuth: boolean): ISetAuthUserData => (
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}}
);

const initState: IISAuth = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state: IISAuth = initState, action: ISetAuthUserData): IISAuth => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

//ThunkCreators


type ThunkActionType = ThunkAction<void, AppStateType, unknown, ISetAuthUserData>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ISetAuthUserData>

export const getAuthUserData = (): ThunkActionType =>
    (dispatch: ThunkDispatchType)  => {
    authAPI.authMe()
        .then(res => {
            if (res.resultCode === 0) {
                debugger
                let {id, email, login} = res.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
};

export const login = (email: string, password: string, rememberMe: boolean): ThunkActionType =>
    (dispatch: ThunkDispatchType) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(getAuthUserData());
            }
        })
};

export const logout = (): ThunkActionType =>
    (dispatch: ThunkDispatchType) => {
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
};