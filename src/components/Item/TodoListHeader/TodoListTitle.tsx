import React from 'react';
import mod from './TodoListTitle.module.sass';

interface IProps {
    title: string
    changeTodolist: (title: string) => void
}

interface ILocalState {
    title: string
    editMode: boolean
}

class TodoListTitle extends React.Component<IProps, ILocalState> {

    state = {
        title: this.props.title,
        editMode: false
    };

    activeEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactiveEditMode = () => {
        this.props.changeTodolist(this.state.title);
        this.setState({
            editMode: false
        })
    };

    changeTodolistTitle = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    };

    render = () => {
        return (
            <div>
                {this.state.editMode
                ? <input onBlur={this.deactiveEditMode} autoFocus={true} value={this.state.title}
                    onChange={this.changeTodolistTitle} className={mod.todolistTitleInput}/>
                : <h3 className={mod.todolistHeaderTitle} onClick={this.activeEditMode}>{this.state.title}</h3>}
            </div>
        )
    }
}

export default TodoListTitle;