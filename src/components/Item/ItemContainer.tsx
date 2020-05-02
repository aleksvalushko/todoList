import React from 'react';
import {addTodoListTC, setTodoListTC} from "../../redux/reducer";
import {connect} from "react-redux";
import Item from "./Item";
import {getAuthUserData, logout} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {ITodolist} from "../../types/types.js";
import {AppStateType} from "../../redux/store";

interface IMapStateProps {
    todolists: Array<ITodolist>
    isAuth: boolean
    login: string | null
}

interface IMapDispatchProps {
    setTodolists: () => void
    setAuthUserData: () => void
    addTodolist: (newTodoListTitle: string) => void
    logout: () => void
}

class ItemContainer extends React.Component<IMapStateProps & IMapDispatchProps> {

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

const mapStateToProps = (state: AppStateType): IMapStateProps => {
    return {
        todolists: state.reducer.todolists,
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
};

const mapDispatchToProps = (dispatch: Function): IMapDispatchProps => {
    return {
        addTodolist: (newTodoListTitle: string) => {
            const thunk = addTodoListTC(newTodoListTitle);
            dispatch(thunk);
        },
        setTodolists: (/*todolists: Array<ITodolist>*/) => {
            const thunk = setTodoListTC(/*todolists*/);
            dispatch(thunk);
        },
        setAuthUserData: (/*id: number, login: string, email: string*/) => {
            const thunk = getAuthUserData(/*id, login, email*/);
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

