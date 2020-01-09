import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/TodoListHeader/AddNewItemForm";
import {connect} from 'react-redux';
import {addTodolist, setTodolist} from "./redux/reducer";
import axios from "axios";
import {api} from "./dal/api";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    };

    state = {
        newTodoListId: 0
    };
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

    restoreState = () => {
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
            });
        /*let newTodoList = {
            id: this.props.todolists.length + 1,
            title: title/!*,
            tasks: []*!/
        };
        this.props.addTodolist(newTodoList)*/
    };

    render = () => {
        const todolists = this.props.todolists.map(t => {
            return <TodoList id={t.id} title={t.title} tasks={t.tasks}/>
        });

        return (
            <>
                <div>
                    <AddNewItemForm addNewTitle={this.addTodolist}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
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
        }
    }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;

