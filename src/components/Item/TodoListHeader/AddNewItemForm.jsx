import React from 'react';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ''
    };

    constructor(props) {
        super(props);
    }

    onInputTextChange = (e) => {
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

    onPressEnter = (e) => {
        if (e.key === 'Enter') {
            this.onAddNewItemTitle();
        }
    };

    render = () => {
        let errorInput = this.state.error ? 'error' : '';
        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
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