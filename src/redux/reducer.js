export const ADD_TODOLIST = 'TodoList/Reducer/ADD_TODOLIST';
export const addTodolist = (newTodoList) => ({type: ADD_TODOLIST, newTodoList});
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE_TODOLIST';
export const deleteTodolist = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const ADD_TASK = 'TodoList/Reducer/ADD_TASK';
export const addTask = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK';
export const changeTask = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});
export const DELETE_TASK = 'TodoList/Reducer/DELETE_TASK';
export const deleteTask = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export const SET_TODOLISTS = 'TodoList/Reducer/SET_TODOLISTS';
export const setTodolist = (todolists) => ({type: SET_TODOLISTS, todolists});
export const SET_TASKS = 'TodoList/Reducer/SET_TASKS';
export const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const CHANGE_TODOLIST = 'TodoList/Reducer/CHANGE_TODOLIST';
export const changeTodolist = (todolistId, newTodolistTitle) => ({type: CHANGE_TODOLIST, todolistId, newTodolistTitle});

const initState = {
    todolists: [
        /*{
            id: 0, title: "Day plans",
            tasks: [{id: 0, title: "HTML", isDone: false, priority: "low"},
                {id: 1, title: "CSS", isDone: true, priority: "low"},
                {id: 2, title: "Patterns", isDone: true, priority: "low"}]
        },
        {
            id: 1, title: "Week plans",
            tasks: [{id: 0, title: "JS", isDone: true, priority: "low"},
                {id: 1, title: "TypeScript", isDone: false, priority: "low"}]
        },
        {
            id: 2, title: "Month plans",
            tasks: [{id: 0, title: "ReactJS", isDone: false, priority: "low"},
                {id: 1, title: "Angular", isDone: true, priority: "low"}]
        }*/]
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map( t => ({...t, tasks: []}))
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
                todolists: state.todolists.map( t => {
                    if(t.id === action.todolistId){
                        return {...t, tasks: action.tasks}
                    } else {
                        return t
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map((todo) => {
                    if (todo.id === action.todolistId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map((task) => {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj}
                                } else {
                                    return task
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
              todolists: state.todolists.map( todo => {
                  if(todo.id === action.todolistId){
                      return {...todo, }
                  } else {
                      return todo
                  }
              })
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map( todo => {
                    if(todo.id === action.todolistId){
                        return {
                            ...todo,
                            tasks: todo.tasks.filter( task => {
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