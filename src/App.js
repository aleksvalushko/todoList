import React from 'react';
import mod from './App.module.css';
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import ConnectedItemContainer from "./components/Item/ItemContainer";

class App extends React.Component {

    componentDidMount() {
        // this.props.initializingApp();
        // this.props.getAuthUserData();
    };

    render = () => {

        return (
            <div className={mod.appWrapper}>
                <Route path='/login' render={() => <Login />}/>
                <Route path='/todolist' render={() => <ConnectedItemContainer />}/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.reducer.initialized
    }
};

export default connect (mapStateToProps, null)(App);

