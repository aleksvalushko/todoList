import {api} from "../dal/api";

const ADD_TODOLIST = 'TodoList/Reducer/ADD_TODOLIST';
const addTodolist = (newTodoList) => ({type: ADD_TODOLIST, newTodoList});
const DELETE_TODOLIST = 'TodoList/Reducer/DELETE_TODOLIST';
export const deleteTodolist = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
const ADD_TASK = 'TodoList/Reducer/ADD_TASK';
const addTask = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK';
export const changeTask = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});
const DELETE_TASK = 'TodoList/Reducer/DELETE_TASK';
export const deleteTask = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
const SET_TODOLISTS = 'TodoList/Reducer/SET_TODOLISTS';
const setTodolist = (todolists) => ({type: SET_TODOLISTS, todolists});
const SET_TASKS = 'TodoList/Reducer/SET_TASKS';
const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
const CHANGE_TODOLIST = 'TodoList/Reducer/CHANGE_TODOLIST';
export const changeTodolist = (todolistId, newTodolistTitle) => ({type: CHANGE_TODOLIST, todolistId, newTodolistTitle});

const initState = {
    todolists: []
};

export const todolistReducer = (state = initState, action) => {
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
                        return {...todo,}
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

export const loadTasksThunkCreator = (todolistId) => {
    return (dispatch) => {
        api.getTasks(todolistId)
            .then(res => {
                let allTasks = res.data.items;
                dispatch(setTasks(allTasks, todolistId));
            });
    };
};

export const addTaskThunkCreator = (newText, todolistId) => {
    return (dispatch) => {
        api.createTask(newText, todolistId)
            .then(res => {
                let newTask = res.data.data.item;
                dispatch(addTask(newTask, todolistId));
            });
    }
};

export const addTodoListThunkCreator = (title) => {
    return (dispatch) => {
        api.createTodolists(title)
            .then(res => {
                let todolists = res.data.data.item;
                dispatch(addTodolist(todolists));
            });
    }
};

export const setTodoListThunkCreator = (dispatch) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolist(res.data));
        });
};

/*
export const restoreState = (dispatch) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolist(res.data));
        });
};

export const addTodoList = (title) => {
    return (dispatch) => {
        api.createTodolists(title)
            .then(res => {
                let todolists = res.data.data.item;
                dispatch(addTodolist(todolists));
            });
    };
}*/
