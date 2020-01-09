import React from 'react';
import './TodoListTask.css';

class TodoListTask extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        editMode: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    };

    deactiveEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title);
        this.setState({
            editMode: false
        });
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeIsDoneStatus(this.props.task.id, status);
    };

    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render = () => {
        let toDoListDoneClass = this.props.task.status ? `${'todoListTask'} ${'done'}` : 'todoListTask';

        /*let priorityTitle = '';
        switch(this.props.task.priority){
            case 0: priorityTitle = "Low"; break;
            case 1: priorityTitle = "Middle"; break;
            case 2: priorityTitle = "High"; break;
            case 3: priorityTitle = "Urgently"; break;
            case 4: priorityTitle = "Later"; break;
        }*/

        return (
            <div className={toDoListDoneClass}>
                <input type="checkbox" checked={this.props.task.status === 2} onChange={this.onIsDoneChanged}/>
                <div className='todoListTaskItem'>
                    <div>
                        {this.state.editMode
                            ? <input onBlur={this.deactiveEditMode} onChange={this.onTitleChanged}
                                     autoFocus={true} value={this.state.title}/>
                            : <span onClick={this.activateEditMode} >{this.props.task.title}
                                {/*; priority: {priorityTitle}*/}</span>}
                    </div>
                    <button className='todoListTaskDelete' onClick={this.onDeleteTask}>X</button>
                </div>
            </div>
        )
    }
}

export default TodoListTask;