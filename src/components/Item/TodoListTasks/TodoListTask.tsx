import React from 'react';
import mod from './TodoListTask.module.sass';
import basket from '../../../images/basket.svg';
import {ITask} from '../../../types/types';

interface IProps {
    task: ITask
    changeTitle: (id: string, title: string) => void
    changeIsDoneStatus: (id: string, status: number) => void
    deleteTask: (id: string) => void
}

class TodoListTask extends React.Component<IProps> {

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

    onIsDoneChanged = (e: React.FormEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeIsDoneStatus(this.props.task.id, status);
    };

    onTitleChanged = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value});
    };

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };

    render = () => {

        let toDoListDoneClass = this.props.task.status ? `${mod.done}` : '';

        return (
            <div className={mod.todoListTask}>
                <input type="checkbox" id='check' checked={this.props.task.status === 2}
                       onChange={this.onIsDoneChanged}/>
                <div className={mod.todoListTaskItem}>
                    <div>
                        {this.state.editMode
                            ? <input onBlur={this.deactiveEditMode} onChange={this.onTitleChanged}
                                     autoFocus={true} value={this.state.title}/>
                            :
                            <span onClick={this.activateEditMode} className={toDoListDoneClass}>{this.props.task.title}
                                </span>}
                    </div>
                    <button className={mod.todoListTaskDelete} onClick={this.onDeleteTask}><img src={basket}
                                                                                                alt="basket"/></button>
                </div>
            </div>
        )
    }
}

export default TodoListTask;