import React from 'react';
import {addTodoListThunkCreator, setTodoListThunkCreator} from "../../redux/reducer";
import {connect} from "react-redux";
import {authAPI} from "../../dal/api";
import Item from "./Item";
import {setAuthUserData} from "../../redux/authReducer";

class ItemContainer extends React.Component {

    componentDidMount() {
        // this.restoreState();
        this.props.setTodolists();
        authAPI.authMe()
            .then(res => {
                if (res.resultCode === 0) {
                    let {id, email, login} = res.data;
                    this.props.setAuthUserData(id, email, login);
                }
            })
        // this.props.setAuthUserData();
    };

    /*restoreState = () => {
        this.props.setTodolists();
    };*/

    render() {

        return (
            <Item {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.reducer.todolists,
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodoList) => {
            const thunk = addTodoListThunkCreator(newTodoList);
            dispatch(thunk);
        },
        setTodolists: (todolists) => {
            const thunk = setTodoListThunkCreator(todolists);
            dispatch(thunk);
        },
        setAuthUserData: (id, login, email) => {
            const action = setAuthUserData(id, login, email);
            dispatch(action);
            /*const thunk = getAuthUserData(id, login, email);
            dispatch(thunk);*/
        }
    }
};

const ConnectedItemContainer = connect(mapStateToProps, mapDispatchToProps)(ItemContainer);

export default ConnectedItemContainer;

