import React from 'react';
import mod from './App.module.css';
import ConnectedItem from "./components/Item/Item";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializingApp} from "./redux/reducer";
import {Route} from "react-router-dom";

class App extends React.Component {

    componentDidMount() {
        this.props.initializingApp();
    };
/*
    state = {
        newTodoListId: 0
    };*/
    /*saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-itemsState-' + this.state.todolists.id, stateAsString);
    };*/

    /*_restoreState = () => {
        let state = {
            todolists: [],
            newTodoListId: 0
        };
        let stateAsString = localStorage.getItem('our-itemsState-' + this.props.todolists.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };*/

   /* restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res.data);
            });
    };

    addTodolist = (title)=> {
        api.createTodolists(title)
            .then(res => {
                let todolists = res.data.data.item;
                this.props.addTodolist(todolists);
            });*/
        /*let newTodoList = {
            id: this.props.todolists.length + 1,
            title: title/!*,
            tasks: []*!/
        };
        this.props.addTodolist(newTodoList)*/
    // };

    render = () => {

        return (
            <div className={mod.appWrapper}>
                <Route path='/login' render={() => <Login />}/>
                <Route path='/todolist' render={() => <ConnectedItem />}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.reducer.initialized
});

export default connect (mapStateToProps, {initializingApp})(App);

