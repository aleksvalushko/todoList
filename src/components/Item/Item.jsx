import React from 'react';
import './Item.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {addTodolist, setTodolist} from "../../redux/reducer";
import {connect} from "react-redux";
import {api} from "../../dal/api";

class Item extends React.Component {

    componentDidMount() {
        this.restoreState();
    };

    state = {
        newTodoListId: 0
    };

    restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res.data);
            });
    };

    addTodolist = (title)=> {
        api.createTodolists(title)
            .then(res => {
                let todolists = res.data.data.item;
                this.props.addTodolist(todolists);
            });
    }

    render = () => {

        let todolists = this.props.todolists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
        });

        return (
            <div className='item'>
                <div>
                    <AddNewItemForm addNewTitle={this.addTodolist}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.reducer.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodoList) => {
            const action = addTodolist(newTodoList);
            dispatch(action);
        },
        setTodolists: (todolists) => {
            const action = setTodolist(todolists);
            dispatch(action);
        }
    }
};

const ConnectedItem = connect(mapStateToProps, mapDispatchToProps)(Item);

export default ConnectedItem;

