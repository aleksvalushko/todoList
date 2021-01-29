export interface ITodolist {
    id: string
    title: string
    tasks: Array<ITask>
    order: number
    addedDate: string
}

export interface ITask {
    id: string
    todolistId: string
    title: string
    // isDoneStatus: boolean
    status: number
    addedDate: string
    deadline: string | null
    description: string | null
    order: number
    priority: number
    startDate: string | null

}

export interface IISAuth {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}