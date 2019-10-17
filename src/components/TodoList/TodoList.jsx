import React from 'react';
import TodoListTitle from "../TodoListHeader/TodoListTitle";
import TodoListTasks from "../../components/TodoListTasks/TodoListTasks";
import TodoListFooter from "../../components/TodoListFooter/TodoListFooter";
import AddNewItemForm from "../TodoListHeader/AddNewItemForm";
import {connect} from 'react-redux';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState();
    };

    state = {
        tasks: [],
        filterValue: 'All',
        nextTaskId: 0
    };

    // nextTaskId = (Math.max.apply(Math, this.state.tasks.map(t => t.id))) + 1;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All',
            nextTaskId: 0
        };

        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
        //let nextTaskId = (Math.max.apply(Math, this.state.tasks.map(t => t.id))) + 1;
    };

    addItem = (newText) => {
        debugger
        let newItem = {id: this.state.nextTaskId, title: newText, isDone: true, priority: 'low'};
        this.state.nextTaskId++;
        let newItems = [...this.state.tasks, newItem];
        this.setState({
            tasks: newItems
        }, () => {
            this.saveState();
        });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj}
            }
        });
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState();
        });

    };

    changeIsDoneStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title}/>
                        <AddNewItemForm addItem={this.props.addTask}/>
                    </div>
                    <TodoListTasks changeIsDoneStatus={this.changeIsDoneStatus}
                                   changeTitle={this.changeTitle}
                                   tasks={this.props.tasks.filter(t => {
                                       if (this.props.filterValue === 'All') {
                                           return true;
                                       } else if (this.props.filterValue === 'Active') {
                                           return t.isDone === false;
                                       } else {
                                           return t.isDone === true;
                                       }
                                       /*switch (this.state.filterValue === 'All'){
                                           case 'All':
                                               return true;
                                               break;
                                           case 'Active':
                                               return t.isDone === false;
                                               break;
                                           case 'Completed':
                                               return t.isDone === true;
                                               break;
                                           default:
                                               return false;
                                               break;
                                       }*/
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            const action = {
                type: 'ADD_TASKS', newTask, todolistId
            };
            dispatch(action)
        }/*,
        changeTask(taskId, obj){

        }*/
    }
};

const TodoListConnected = connect(null, mapDispatchToProps)(TodoList);

export default TodoListConnected;

