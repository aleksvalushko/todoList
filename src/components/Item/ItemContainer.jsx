import React from 'react';
import {addTodolist, setTodolist} from "../../redux/reducer";
import {connect} from "react-redux";
import {api, authAPI} from "../../dal/api";
import Item from "./Item";
import {setAuthUserData} from "../../redux/authReducer";

class ItemContainer extends React.Component {

    componentDidMount() {
        this.restoreState();
        authAPI.authMe()
            .then(res => {
                if (res.resultCode === 0) {
                    debugger
                    let {id, email, login} = res.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    };

    restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res.data);
            });
    };

    addTodolist = (title) => {
        api.createTodolists(title)
            .then(res => {
                let todolists = res.data.data.item;
                this.props.addTodolist(todolists);
            });
    };

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
            const action = addTodolist(newTodoList);
            dispatch(action);
        },
        setTodolists: (todolists) => {
            const action = setTodolist(todolists);
            dispatch(action);
        },
        setAuthUserData: (id, login, email) => {
            const action = setAuthUserData(id, login, email);
            dispatch(action);
        }
    }
};

const ConnectedItemContainer = connect(mapStateToProps, mapDispatchToProps)(ItemContainer);

export default ConnectedItemContainer;

