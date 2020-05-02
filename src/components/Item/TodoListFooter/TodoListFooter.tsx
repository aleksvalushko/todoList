import React from 'react';
import mod from './TodoListFooter.module.sass'

interface IProps {
    changeFilter: (value: string) => void
    filterValue: string
}

class TodoListFooter extends React.Component<IProps>{

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

        let classForAll = this.props.filterValue === 'All' ? `${mod.filterActive}` : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? `${mod.filterActive}` : '';
        let classForActive = this.props.filterValue === 'Active' ? `${mod.filterActive}` : '';

        return (
            <div className={mod.todoListFooter}>
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