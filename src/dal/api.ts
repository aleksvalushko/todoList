import axios from 'axios';
import {ITask} from "../types/types.js";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {'API-KEY': '2a70584b-20f7-4ff5-8c15-684fb9f4be7b'}
});

/*interface IGetTaskResponseType {
    items: Array<ITask>
    totalCount: number
    error: string | null
}*/

export const api = {
    createTask(newTaskTitle: string, todolistId: string) {
        let promise = instance.post(`/todo-lists/${todolistId}/tasks`,
            {title: newTaskTitle});
        return promise;
    },
    getTasks(taskId: string) {
        let promise = instance.get/*<IGetTaskResponseType>*/(`/todo-lists/${taskId}/tasks`);
        return promise;
    },
    updateTask(task: ITask, obj: any) {
        let promise = instance.put('/todo-lists/tasks',{...task, ...obj});
        return promise;
    },
    deleteTask(taskId: string) {
        let promise = instance.delete(`/todo-lists/tasks/${taskId}`);
        return promise;
    },
    deleteTodolist(todolistId: string) {
        let promise = instance.delete(`/todo-lists/${todolistId}`);
        return promise;
    },
    getTodolists() {
        let promise = instance.get('/todo-lists');
        return promise;
    },
    createTodolists(newTodolistTitle: string) {
        let promise = instance.post('/todo-lists',{title: newTodolistTitle});
        return promise;
    },
    updateTodolist(todolistId: string, newTodolistTitle: string) {
        let promise = instance.put(`/todo-lists/${todolistId}`, {title: newTodolistTitle});
        return promise;
    }
};

export const authAPI = {
    authMe(){
        let promise = instance.get('/auth/me')
            .then(response => {
                return response.data
            });
        return promise;
    },
   login(email: string, password: string, rememberMe = false){
        let promise = instance.post('/auth/login', {email, password, rememberMe})
            .then(response => {
                return response.data
            });
        return promise;
    },
    logout(){
        let promise = instance.delete('/auth/login')
            .then(response => {
                return response.data
            });
        return promise;
    }
};