import React from 'react';
import './TodoListFooter.css'

class TodoListFooter extends React.Component{

    state = {
        isHidden: false
    };

    onAllFilterClick = () => {
        this.props.changeFilter('All');
    };

    onComplitedFilterClick = () => {
        this.props.changeFilter('Completed');
    };

    onActiveFilterClick = () => {
        this.props.changeFilter('Active');
    };

    onHideFilterClick = () => {
        this.setState({
            isHidden: true
        })
    };

    onShowFilterClick = () => {
        this.setState({
            isHidden: false
        })
    };

    render = () => {

        let classForAll = this.props.filterValue === 'All' ? 'filterActive' : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? 'filterActive' : '';
        let classForActive = this.props.filterValue === 'Active' ? 'filterActive' : '';

        return (
            <div className="todoList-footer">
                {!this.state.isHidden &&
                <div>
                    <button onClick= {() => {this.onAllFilterClick()}}
                            className={classForAll}>All</button>
                    <button onClick= {() => {this.onComplitedFilterClick()}}
                            className={classForCompleted}>Completed</button>
                    <button onClick= {() => {this.onActiveFilterClick()}}
                            className={classForActive}>Active</button>
                </div>}
                {!this.state.isHidden && <span onClick={() => {this.onHideFilterClick()}}>hide</span>}
                {this.state.isHidden && <span onClick={() => {this.onShowFilterClick()}}>show</span>}
            </div>
        )
    }
}

export default TodoListFooter;