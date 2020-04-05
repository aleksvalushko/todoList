import React from 'react';
import mod from './TodoListTitle.module.css';

class TodoListTitle extends React.Component {

    constructor(props) {
        super(props);
    }

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

    changeTodolistTitle = (e) => {
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