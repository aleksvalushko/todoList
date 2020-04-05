import React from 'react';
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../TodoListHeader/AddNewItemForm";
import {connect} from 'react-redux';
import mod from './TodoList.module.css';
import {
    addTaskTC, changeTaskTC, changeTodoListTC,
    deleteTaskTC, deleteTodolistTC, loadTasksTC
} from "../../../redux/reducer";
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
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId;
        });
        let task = {...changedTask, ...obj};
        this.props.changeTask(taskId, this.props.id, task, obj);
    };

    changeTodolist = (title) => {
        this.props.changeTodolist(this.props.id, title);
    };

    changeIsDoneStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId);
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id);
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
                    <AddNewItemForm addNewTitle={this.addTask}/>
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
            dispatch(addTaskTC(newText, todolistId));
        },
        loadTasks: (todolistId) => {
            dispatch(loadTasksTC(todolistId));
        },
        changeTask: (taskId, todolistId, task, obj) => {
            dispatch(changeTaskTC(taskId, todolistId, task, obj));
        },
        deleteTask(todolistId, taskId) {
            dispatch(deleteTaskTC(todolistId, taskId));
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolistTC(todolistId));
        },
        changeTodolist(todolistId, newTodolistTitle) {
            dispatch(changeTodoListTC(todolistId, newTodolistTitle));
        }
    }
};

const TodoListConnected = connect(null, mapDispatchToProps)(TodoList);

export default TodoListConnected;

