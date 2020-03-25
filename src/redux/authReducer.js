const SET_AUTH_USER_DATA = 'TodoList/Reducer/SET_AUTH_USER_DATA';
export const setAuthUserData = (userId, email, login) => (
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login}}
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
                ...action.payload,
                isAuth: true
            };
        default:
            return state;
    }
};

/*export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};*/

/*
export const initializingApp = () => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    await Promise.all([promise]);
    dispatch(successInitializing());
};*/
