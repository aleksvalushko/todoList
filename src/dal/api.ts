import axios from 'axios';
import {ITask, ITodolist} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {'API-KEY': '2a70584b-20f7-4ff5-8c15-684fb9f4be7b'}
});

type CommonResponseType<T> = {
    data: T
    messages: Array<string>
    resultCode: number
}

type GetTasksResponseType = {
    items: Array<ITask>
    error: null | string
    totalCount: number
}

export const api = {
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post<CommonResponseType<{ item: ITask }>>(`/todo-lists/${todolistId}/tasks`,
            {title: newTaskTitle});
    },
    getTasks(taskId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${taskId}/tasks`);
    },
    updateTask(task: ITask, obj: any) {
        return instance.put<CommonResponseType<{
            task: ITask
            obj: {
                title: string
            }
        }>>('/todo-lists/tasks', {...task, ...obj});
    },
    deleteTask(taskId: string) {
        return instance.delete <CommonResponseType<{ taskId: string }>>(`/todo-lists/tasks/${taskId}`);
    },
    deleteTodolist(todolistId: string) {
        return instance.delete <CommonResponseType<{ todolistId: string }>>(`/todo-lists/${todolistId}`);
    },
    getTodolists() {
        return instance.get<Array<ITodolist>>('/todo-lists');
    },
    createTodolists(newTodolistTitle: string) {
        return instance.post <CommonResponseType<{ item: ITodolist }>>('/todo-lists',
            {title: newTodolistTitle});
    },
    updateTodolist(todolistId: string, newTodolistTitle: string) {
        return instance.put <CommonResponseType<{
            todolistId: string
            newTodolistTitle: string
        }>>(`/todo-lists/${todolistId}`, {title: newTodolistTitle});
    }
};

export const authAPI = {
    authMe() {
        return instance.get('/auth/me')
            .then(response => {
                return response.data
            });
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post('/auth/login', {email, password, rememberMe})
            .then(response => {
                return response.data
            });
    },
    logout() {
        return instance.delete('/auth/login')
            .then(response => {
                return response.data
            });
    }
};