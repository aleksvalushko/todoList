import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {

    constructor(props) {
        super(props)
    }

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