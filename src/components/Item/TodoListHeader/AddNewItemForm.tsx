import React from 'react';
import mod from './TodoListInputForm.module.sass';

interface IProps {
    addNewTitle: (newTitle: string) => void
}

class AddNewItemForm extends React.Component<IProps> {

    state = {
        error: false,
        title: ''
    };

    onInputTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    };

    onAddNewItemTitle = () => {
        let newTitle = this.state.title;
        this.setState({title: ''});
        if (newTitle === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            });
            this.props.addNewTitle(newTitle);
        }
    };

    onPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            this.onAddNewItemTitle();
        }
    };

    render = () => {
        let errorInput = this.state.error ? 'error' : '';
        return (
            <div className={mod.todoListHeader}>
                <div className={mod.todoListNewTaskForm}>
                    <input type="text" placeholder="New item name"
                           className={errorInput}
                           onChange={this.onInputTextChange}
                           onKeyPress={this.onPressEnter}
                           value={this.state.title}/>
                    <button onClick={() => {this.onAddNewItemTitle()}
                    }>Add
                    </button>
                </div>
            </div>
        )
    }
}

export default AddNewItemForm;