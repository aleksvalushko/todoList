import {authAPI} from "../dal/api";

const SET_AUTH_USER_DATA = 'TodoList/Reducer/SET_AUTH_USER_DATA';
const setAuthUserData = (userId, email, login, isAuth) => (
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}}
);

const initState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

export const authReducer = (state = initState, action) => {
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

export const getAuthUserData = () => (dispatch) => {
    authAPI.authMe()
        .then(res => {
            if (res.resultCode === 0) {
                let {id, email, login} = res.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
};

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(getAuthUserData());
            }
        })
};

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
};