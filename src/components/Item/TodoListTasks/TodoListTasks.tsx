import React from 'react';
import TodoListTask from "./TodoListTask";
import {ITask} from "../../../types/types.js";

interface IProps {
    tasks: Array<ITask>
    changeTitle: (id: string, title: string) => void
    changeIsDoneStatus: (id: string, status: number) => void
    deleteTask: (id: string) => void
}

class TodoListTasks extends React.Component<IProps> {

    render = () => {

        let tasksElement = this.props.tasks.map(task =>
            <TodoListTask key={task.id}
                          task={task}
                          changeIsDoneStatus={this.props.changeIsDoneStatus}
                          changeTitle={this.props.changeTitle}
                          deleteTask={this.props.deleteTask} />);

        return (
            <div>
                {tasksElement}
            </div>
        )
    }
}

export default TodoListTasks;