import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {'API-KEY': '2a70584b-20f7-4ff5-8c15-684fb9f4be7b'}
});

export const api = {
    createTask(newTaskTitle, todolistId) {
        let promise = instance.post(`/todo-lists/${todolistId}/tasks`,
            {title: newTaskTitle});
        return promise;
    },
    getTasks(taskId) {
        let promise = instance.get(`/todo-lists/${taskId}/tasks`);
        return promise;
    },
    updateTask(task, obj) {
        let promise = instance.put('/todo-lists/tasks',{...task, ...obj});
        return promise;
    },
    deleteTask(taskId) {
        let promise = instance.delete(`/todo-lists/tasks/${taskId}`);
        return promise;
    },
    deleteTodolist(todolistId) {
        let promise = instance.delete(`/todo-lists/${todolistId}`);
        return promise;
    },
    getTodolists() {
        let promise = instance.get('/todo-lists');
        return promise;
    },
    createTodolists(newTodolistTitle) {
        let promise = instance.post('/todo-lists',{title: newTodolistTitle});
        return promise;
    },
    updateTodolist(todolistId, newTodolistTitle) {
        let promise = instance.put(`/todo-lists/${todolistId}`, {title: newTodolistTitle});
        return promise;
    }
};