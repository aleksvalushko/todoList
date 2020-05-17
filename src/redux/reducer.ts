import {api} from "../dal/api";
import {ITask, ITodolist} from "../types/types.js";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";

interface IInitState {
    todolists: Array<ITodolist>
}

const initState: IInitState = {
    todolists: []
};

export const todolistReducer = (state: IInitState = initState, action: TodolistReducerActionTypes): IInitState => {
    switch (action.type) {
        case "TodoList/Reducer/ADD_TODOLIST":
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };
        case "TodoList/Reducer/SET_TODOLISTS":
            return {
                ...state,
                todolists: action.todolists.map(t => ({...t, tasks: []}))
            };
        case "TodoList/Reducer/DELETE_TODOLIST":
            return {
                ...state,
                todolists: state.todolists.filter(t => {
                    return t.id !== action.todolistId
                })
            };
        case "TodoList/Reducer/ADD_TASK":
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
        case "TodoList/Reducer/SET_TASKS":
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
        case "TodoList/Reducer/CHANGE_TASK":
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
        case "TodoList/Reducer/CHANGE_TODOLIST":
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
        case "TodoList/Reducer/DELETE_TASK":
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

//ActionCreators
type TodolistReducerActionTypes = InferActionsTypes<typeof actions>;

const actions = {
    changeTodolist: (todolistId: string, newTodolistTitle: string) =>
        ({type: 'TodoList/Reducer/CHANGE_TODOLIST', todolistId, newTodolistTitle} as const),
    setTasks: (tasks: Array<ITask>, todolistId: string) =>
        ({type: 'TodoList/Reducer/SET_TASKS', tasks, todolistId} as const),
    setTodolist: (todolists: Array<ITodolist>) =>
        ({type: 'TodoList/Reducer/SET_TODOLISTS', todolists} as const),
    deleteTask: (todolistId: string, taskId: string) =>
        ({type: 'TodoList/Reducer/DELETE_TASK', todolistId, taskId} as const),
    changeTask: (taskId: string, obj: any, todolistId: string) =>
        ({type: 'TodoList/Reducer/CHANGE_TASK', taskId, obj, todolistId} as const),
    addTask: (newTask: ITask, todolistId: string) =>
        ({type: 'TodoList/Reducer/ADD_TASK', newTask, todolistId} as const),
    deleteTodolist: (todolistId: string) =>
        ({type: 'TodoList/Reducer/DELETE_TODOLIST', todolistId} as const),
    addTodolist: (newTodoList: ITodolist) =>
        ({type: 'TodoList/Reducer/ADD_TODOLIST', newTodoList} as const)
};

//ThunkCreators

type ThunkActionType = ThunkAction<void, AppStateType, unknown, TodolistReducerActionTypes>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, TodolistReducerActionTypes>

export const loadTasksTC = (todolistId: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await api.getTasks(todolistId);
        let allTasks = response.data.items;
        dispatch(actions.setTasks(allTasks, todolistId));
    };
};

export const addTaskTC = (newText: string, todolistId: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await api.createTask(newText, todolistId);
        let newTask = response.data.data.item;
        dispatch(actions.addTask(newTask, todolistId));
    }
};

export const changeTaskTC = (taskId: string, todolistId: string, task: ITask, obj: any): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        await api.updateTask(task, obj);
        dispatch(actions.changeTask(taskId, obj, todolistId));
    }
};

export const deleteTaskTC = (todolistId: string, taskId: string): ThunkActionType =>
    async (dispatch: ThunkDispatchType) => {
        await api.deleteTask(taskId);
        dispatch(actions.deleteTask(todolistId, taskId));
    };

export const setTodoListTC = (): ThunkActionType =>
    async (dispatch: ThunkDispatchType) => {
        let response = await api.getTodolists();
        dispatch(actions.setTodolist(response.data));
    };

export const addTodoListTC = (title: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        let response = await api.createTodolists(title);
        let todolists = response.data.data.item;
        dispatch(actions.addTodolist(todolists));
    }
};

export const changeTodoListTC = (todolistId: string, newTodolistTitle: string): ThunkActionType => {
    return async (dispatch: ThunkDispatchType) => {
        await api.updateTodolist(todolistId, newTodolistTitle);
        dispatch(actions.changeTodolist(todolistId, newTodolistTitle));
    }
};

export const deleteTodolistTC = (todolistId: string): ThunkActionType =>
    async (dispatch: ThunkDispatchType) => {
        await api.deleteTodolist(todolistId);
        dispatch(actions.deleteTodolist(todolistId));
    };