import React from 'react';
import {addTodoListThunkCreator, setTodoListThunkCreator} from "../../redux/reducer";
import {connect} from "react-redux";
import Item from "./Item";
import {getAuthUserData, logout} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

class ItemContainer extends React.Component {

    componentDidMount() {
        this.props.setTodolists();
        this.props.setAuthUserData();
    };

    render() {

        if(!this.props.isAuth){
            return <Redirect to='/login'/>
        }

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
            const thunk = getAuthUserData(id, login, email);
            dispatch(thunk);
        },
        logout: () => {
            const thunk = logout();
            dispatch(thunk);
        }
    }
};

const ConnectedItemContainer = connect(mapStateToProps, mapDispatchToProps)(ItemContainer);

export default ConnectedItemContainer;

