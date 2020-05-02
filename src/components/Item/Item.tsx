import React from 'react';
import mod from './Item.module.sass';
import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./TodoListHeader/AddNewItemForm";
import {ITodolist} from "../../types/types.js";

interface IProps {
    addTodolist: (title: string) => void
    todolists: Array<ITodolist>
    isAuth :boolean
    login: string | null
    logout: () => void
}

class Item extends React.Component<IProps> {

    state = {
        newTodoListId: 0
    };

    addNewTodolist = (title: string) => {
        this.props.addTodolist(title);
    };

    render() {

        let todolists = this.props.todolists.map(t => {
            return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
        });

        return (
            <div className={mod.item}>
                <div className={mod.itemHeader}>
                    <AddNewItemForm addNewTitle={this.addNewTodolist}/>
                    {this.props.isAuth
                        ? <div>{this.props.login}
                            <div onClick={this.props.logout} className={mod.logout}>logout</div>
                        </div>
                        : <div>Login</div>}
                </div>
                <div className={mod.App}>
                    {todolists}
                </div>
            </div>
        );
    }
}

export default Item;

