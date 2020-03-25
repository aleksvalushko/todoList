import React from 'react';
import mod from './Item.module.css';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";

class Item extends React.Component {

    state = {
        newTodoListId: 0
    };

    render() {
        let todolists = this.props.todolists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
        });

        return (
            <div className={mod.item}>
                <div className={mod.itemHeader}>
                    <AddNewItemForm addNewTitle={this.addTodolist}/>
                    {this.props.isAuth ? <div>{this.props.login}</div> : <div>Login</div>}
                </div>
                <div className={mod.App}>
                    {todolists}
                </div>
            </div>
        );
    }
}

export default Item;

