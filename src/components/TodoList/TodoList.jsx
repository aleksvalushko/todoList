import React from 'react';
import TodoListTitle from "../TodoListHeader/TodoListTitle";
import TodoListTasks from "../../components/TodoListTasks/TodoListTasks";
import TodoListFooter from "../../components/TodoListFooter/TodoListFooter";
import AddNewItemForm from "../TodoListHeader/AddNewItemForm";
import {connect} from 'react-redux';
import './TodoList.css';
import {
    addTask,
    changeTask, changeTodolist,
    deleteTask,
    deleteTodolist, setTasks
} from "../../redux/reducer";
import {api} from "../../dal/api";
import basket from "../../images/basket.svg";

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
        api.getTasks(this.props.id)
            .then(res => {
                let allTasks = res.data.items;
                this.props.setTasks(allTasks, this.props.id);
            });
    };

    addTask = (newTitle) => {
        api.createTask(newTitle, this.props.id)
            .then(res => {
                let newTask = res.data.data.item;
                this.props.addTask(newTask, this.props.id);
            });
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
            <div className="App">
                <div className="todoList">
                    <div className="todoListHeader">
                        <div className='todoListTitle'>
                            <TodoListTitle title={this.props.title} changeTodolist={this.changeTodolist}/>
                            <button onClick={() => {
                                this.deleteTodolist()
                            }} className='todoListDeleteButton'><img src={basket} alt="basket"/>
                            </button>
                        </div>
                    </div>
                    <div className='todoListContent'>
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
                        <AddNewItemForm addNewTitle={this.addTask}/>
                    </div>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = addTask(newTask, todolistId);
            dispatch(action)
        },
        setTasks: (tasks, todolistId) => {
            const action = setTasks(tasks, todolistId);
            dispatch(action);
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

