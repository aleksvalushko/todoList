import React from 'react';
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../TodoListHeader/AddNewItemForm";
import {connect} from 'react-redux';
import mod from './TodoList.module.css';
import {
    addTaskThunkCreator,
    changeTask, changeTodolist,
    deleteTask,
    deleteTodolist, loadTasksThunkCreator
} from "../../../redux/reducer";
import {api} from "../../../dal/api";
import basket from "../../../images/basket.svg";
import TodoListTitle from "../TodoListHeader/TodoListTitle";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState();
    };

    state = {
        filterValue: 'All',
        nextTaskId: 3
    };

    restoreState = () => {
        this.props.loadTasks(this.props.id);
    };

    addTask = (newText) => {
        this.props.addTask(newText, this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (taskId, obj) => {
        this.props.tasks.forEach(t => {

            if (t.id === taskId) {
                api.updateTask(t, obj)
                    .then(res => {
                        this.props.changeTask(this.props.id, taskId, obj)
                    });
            }
        });
    };

    changeTodolist = (todolistId, newTodolistTitle) => {
        api.updateTodolist(this.props.id, newTodolistTitle)
            .then(res => {
                this.props.changeTodolist(this.props.id, this.props.title);
            })
    };

    changeIsDoneStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    deleteTask = (taskId) => {
        api.deleteTask(taskId)
            .then(res => {
                this.props.deleteTask(this.props.id, taskId);
            });
    };

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                this.props.deleteTodolist(this.props.id);
            });
    };

    render = () => {

        let {tasks = []} = this.props;

        return (
            <div className={mod.App}>
                <div className={mod.todoList}>
                    <div className={mod.todoListHeader}>
                        <TodoListTitle title={this.props.title} changeTodolist={this.changeTodolist}/>
                        <button onClick={() => {
                            this.deleteTodolist()
                        }} className={mod.todoListDeleteButton}><img src={basket} alt="basket"/>
                        </button>
                    </div>
                    <AddNewItemForm addNewTitle={this.addTask} />
                    <div className={mod.todoListContent}>
                        <TodoListTasks changeIsDoneStatus={this.changeIsDoneStatus}
                                       changeTitle={this.changeTitle}
                                       changeTask={this.changeTask}
                                       deleteTask={this.deleteTask}
                                       tasks={tasks.filter(t => {
                                           if (this.state.filterValue === 'All') {
                                               return 2;
                                           } else if (this.state.filterValue === 'Active') {
                                               return t.status === 0;
                                           } else {
                                               return t.status === 2;
                                           }
                                           /*switch (this.state.filterValue){
                                               case 'All':
                                                   return true;
                                               case 'Active':
                                                   return t.isDone === false;
                                               case 'Completed':
                                                   return t.isDone === true;
                                               default:
                                                   return false;
                                                   break;
                                           }*/
                                       })}/>
                    </div>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newText, todolistId) => {
            const thunk = addTaskThunkCreator(newText, todolistId);
            dispatch(thunk);
        },
        loadTasks: (todolistId) => {
            const thunk = loadTasksThunkCreator(todolistId);
            dispatch(thunk);
        },
        changeTask: (todolistId, taskId, obj) => {
            const action = changeTask(todolistId, taskId, obj);
            dispatch(action)
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodolist(todolistId);
            dispatch(action);
        },
        deleteTask(todolistId, taskId) {
            const action = deleteTask(todolistId, taskId);
            dispatch(action);
        },
        changeTodolist(todolistId, newTodolistTitle) {
            const action = changeTodolist(todolistId, newTodolistTitle);
            dispatch(action);
        }
    }
};

const TodoListConnected = connect(null, mapDispatchToProps)(TodoList);

export default TodoListConnected;

