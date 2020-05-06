import {api} from "../dal/api";
import {ITask, ITodolist} from "../types/types.js";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

const ADD_TODOLIST = 'TodoList/Reducer/ADD_TODOLIST';

interface IAddTodolist {
    type: typeof ADD_TODOLIST
    newTodoList: ITodolist
}

const addTodolist = (newTodoList: ITodolist): IAddTodolist => ({type: ADD_TODOLIST, newTodoList});

const DELETE_TODOLIST = 'TodoList/Reducer/DELETE_TODOLIST';

interface IDeleteTodolist {
    type: typeof DELETE_TODOLIST
    todolistId: string
}

const deleteTodolist = (todolistId: string): IDeleteTodolist => ({type: DELETE_TODOLIST, todolistId});

const ADD_TASK = 'TodoList/Reducer/ADD_TASK';

interface IAddTask {
    type: typeof ADD_TASK
    newTask: ITask
    todolistId: string
}

const addTask = (newTask: ITask, todolistId: string): IAddTask => ({type: ADD_TASK, newTask, todolistId});

const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK';

interface IChangeTask {
    type: typeof CHANGE_TASK
    taskId: string
    obj: any
    todolistId: string
}

const changeTask = (taskId: string, obj: any, todolistId: string): IChangeTask => ({
    type: CHANGE_TASK,
    taskId,
    obj,
    todolistId
});

const DELETE_TASK = 'TodoList/Reducer/DELETE_TASK';

interface IDeleteTask {
    type: typeof DELETE_TASK
    todolistId: string
    taskId: string
}

const deleteTask = (todolistId: string, taskId: string): IDeleteTask => ({type: DELETE_TASK, todolistId, taskId});

const SET_TODOLISTS = 'TodoList/Reducer/SET_TODOLISTS';

interface ISetTodolists {
    type: typeof SET_TODOLISTS
    todolists: Array<ITodolist>
}

const setTodolist = (todolists: Array<ITodolist>): ISetTodolists => ({type: SET_TODOLISTS, todolists});

const SET_TASKS = 'TodoList/Reducer/SET_TASKS';

interface ISetTasks {
    type: typeof SET_TASKS
    tasks: Array<ITask>
    todolistId: string
}

const setTasks = (tasks: Array<ITask>, todolistId: string): ISetTasks => ({type: SET_TASKS, tasks, todolistId});

const CHANGE_TODOLIST = 'TodoList/Reducer/CHANGE_TODOLIST';

interface IChangeTodolist {
    type: typeof CHANGE_TODOLIST
    todolistId: string
    newTodolistTitle: string
}

const changeTodolist = (todolistId: string, newTodolistTitle: string): IChangeTodolist =>
    ({type: CHANGE_TODOLIST, todolistId, newTodolistTitle});

type TodolistReducerActionTypes = IAddTodolist | IDeleteTodolist | IAddTask | IChangeTask
    | IDeleteTask | ISetTodolists | ISetTasks | IChangeTodolist;

interface IInitState {
    todolists: Array<ITodolist>
}

const initState: IInitState = {
    todolists: []
};

export const todolistReducer = (state: IInitState = initState, action: TodolistReducerActionTypes): IInitState => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(t => ({...t, tasks: []}))
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(t => {
                    return t.id !== action.todolistId
                })
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {...t, tasks: [...t.tasks, action.newTask]}
                    } else {
                        return t
                    }
                })
            };
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(t => {
                    if (t.id === action.todolistId) {
                        return {...t, tasks: action.tasks}
                    } else {
                        return t
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj};
                                } else {
                                    return task;
                                }
                            })
                        }
                    } else {
                        return todo
                    }
                })
            };
        case CHANGE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistId) {
                        return {...todo}
                    } else {
                        return todo
                    }
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id === action.todolistId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.filter(task => {
                                return task.id !== action.taskId
                            })
                        }
                    } else {
                        return todo
                    }
                })
            };
        default:
            return state;
    }
};

//ThunkCreators

type ThunkActionType = ThunkAction<void, AppStateType, unknown, TodolistReducerActionTypes>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodolistReducerActionTypes>

export const loadTasksTC = (todolistId: string): ThunkActionType => {
    /*return (dispatch: ThunkDispatchType) => {
        api.getTasks(todolistId)
            .then(res => {
                let allTasks = res.data.items;
                dispatch(setTasks(allTasks, todolistId));
            });
    };*/
    return async (dispatch: ThunkDispatchType) => {
        let response = await api.getTasks(todolistId);
        let allTasks = response.data.items;
        dispatch(setTasks(allTasks, todolistId));
    };
};

export const addTaskTC = (newText: string, todolistId: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await api.createTask(newText, todolistId);
        let newTask = response.data.data.item;
        dispatch(addTask(newTask, todolistId));
    }
};

export const changeTaskTC = (taskId: string, todolistId: string, task: ITask, obj: any): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        await api.updateTask(task, obj);
        dispatch(changeTask(taskId, obj, todolistId));
    }
};

export const deleteTaskTC = (todolistId: string, taskId: string): ThunkActionType =>
    async (dispatch: ThunkDispatchType) => {
        await api.deleteTask(taskId);
        dispatch(deleteTask(todolistId, taskId));
    };

export const setTodoListTC = (): ThunkActionType =>
    async (dispatch: ThunkDispatchType) => {
        let response = await api.getTodolists();
        dispatch(setTodolist(response.data));
    };

export const addTodoListTC = (title: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await api.createTodolists(title);
        let todolists = response.data.data.item;
        dispatch(addTodolist(todolists));
    }
};

export const changeTodoListTC = (todolistId: string, newTodolistTitle: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        await api.updateTodolist(todolistId, newTodolistTitle);
        dispatch(changeTodolist(todolistId, newTodolistTitle));
    }
};

export const deleteTodolistTC = (todolistId: string): ThunkActionType =>
    async (dispatch: ThunkDispatchType) => {
        await api.deleteTodolist(todolistId);
        dispatch(deleteTodolist(todolistId));
    };