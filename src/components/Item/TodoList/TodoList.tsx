import React from 'react';
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../TodoListHeader/AddNewItemForm";
import {connect} from 'react-redux';
import mod from './TodoList.module.sass';
import {
    addTaskTC, changeTaskTC, changeTodoListTC,
    deleteTaskTC, deleteTodolistTC, loadTasksTC
} from "../../../redux/reducer";
import basket from "../../../images/basket.svg";
import TodoListTitle from "../TodoListHeader/TodoListTitle";
import {ITask} from "../../../types/types.js";

interface IProps {
    loadTasks: (id: string) => void
    addTask: (newText: string, id: string) => void
    changeTask: (taskId: string, id: string, task: ITask, obj: any) => void
    changeTodolist: (id: string, title: string) => void
    deleteTask: (taskId: string, id: string) => void
    deleteTodolist: (id: string) => void
    title: string
    id: string
    tasks: Array<ITask>
}

interface ILocalState {
    filterValue: string
    nextTaskId: number
}

class TodoList extends React.Component<IProps, ILocalState> {

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

    addTask = (newText: string) => {
        this.props.addTask(newText, this.props.id);
    };

    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (taskId: string, obj: any) => {
        let changedTask = this.props.tasks.find(task => {
            return task.id === taskId;
        });
        let task = {...changedTask, ...obj};
        this.props.changeTask(taskId, this.props.id, task, obj);
    };

    changeTodolist = (title: string) => {
        this.props.changeTodolist(this.props.id, title);
    };

    changeIsDoneStatus = (taskId: string, status: number) => {
        this.changeTask(taskId, {status: status})
    };

    changeTitle = (taskId: string, title: string) => {
        this.changeTask(taskId, {title: title})
    };

    deleteTask = (taskId: string) => {
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
                                       /*changeTask={this.changeTask}*/
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

const mapDispatchToProps = (dispatch: Function) => {
    return {
        addTask: (newText: string, todolistId: string) => {
            dispatch(addTaskTC(newText, todolistId));
        },
        loadTasks: (todolistId: string) => {
            dispatch(loadTasksTC(todolistId));
        },
        changeTask: (taskId: string, todolistId: string, task: ITask, obj: any) => {
            dispatch(changeTaskTC(taskId, todolistId, task, obj));
        },
        deleteTask(todolistId: string, taskId: string) {
            dispatch(deleteTaskTC(todolistId, taskId));
        },
        deleteTodolist: (todolistId: string) => {
            dispatch(deleteTodolistTC(todolistId));
        },
        changeTodolist(todolistId: string, newTodolistTitle: string) {
            dispatch(changeTodoListTC(todolistId, newTodolistTitle));
        }
    }
};

const TodoListConnected = connect(null, mapDispatchToProps)(TodoList);

export default TodoListConnected;

