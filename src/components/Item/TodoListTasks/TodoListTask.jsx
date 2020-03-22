import React from 'react';
import mod from './TodoListTask.module.css';
import basket from '../../../images/basket.svg';

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

        let toDoListDoneClass = this.props.task.status ? `${mod.done}` : '';
        /*let priorityTitle = '';
        switch(this.props.task.priority){
            case 0: priorityTitle = "Low"; break;
            case 1: priorityTitle = "Middle"; break;
            case 2: priorityTitle = "High"; break;
            case 3: priorityTitle = "Urgently"; break;
            case 4: priorityTitle = "Later"; break;
        }*/

        return (
            <div className={mod.todoListTask}>
                {/*<div className='toDoListCheck'>*/}
                    <input type="checkbox" id='check' checked={this.props.task.status === 2} onChange={this.onIsDoneChanged}/>
                    {/*<label htmlFor="check"></label>*/}
                {/*</div>*/}
                <div className={mod.todoListTaskItem}>
                    <div>
                        {this.state.editMode
                            ? <input onBlur={this.deactiveEditMode} onChange={this.onTitleChanged}
                                     autoFocus={true} value={this.state.title}/>
                            : <span onClick={this.activateEditMode} className={toDoListDoneClass}>{this.props.task.title}
                                {/*; priority: {priorityTitle}*/}</span>}
                    </div>
                    <button className={mod.todoListTaskDelete} onClick={this.onDeleteTask}><img src={basket} alt="basket"/></button>
                </div>
            </div>
        )
    }
}

export default TodoListTask;