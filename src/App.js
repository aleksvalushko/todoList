import React from 'react';
import mod from './App.module.css';
import Login from "./components/Login/Login";
import {Route} from "react-router-dom";
import ConnectedItemContainer from "./components/Item/ItemContainer";

class App extends React.Component {

    render = () => {

        return (
            <div className={mod.appWrapper}>
                <Route path='/login' render={() => <Login />}/>
                <Route path='/todolist' render={() => <ConnectedItemContainer />}/>

            </div>
        );
    }
}

export default App;

