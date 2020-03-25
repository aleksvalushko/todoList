import React from 'react';
import mod from './Login.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";
import {Input} from "../FormControl/FormControl";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const maxLength20 = maxLengthCreator(20);
const maxLength40 = maxLengthCreator(40);

export let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit} className='loginForm'>
        <Field component={Input} name={'login'} placeholder={'Login'}
               validate={[required, maxLength40]}/>
        <Field component={Input} name={'password'} type={'password'} placeholder={'Password'}
               validate={[required, maxLength20]}/>
        <div><Field component={Input} type={'checkbox'} name={'rememberMe'}/>remember me</div>
        <button>Send</button>
    </form>
};

let Login = () => {

    let onSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div className={mod.login}>
            <div className={mod.loginTitle}>Login</div>
            <LoginReducerForm onSubmit={onSubmit}/>
        </div>
    );
};

export let LoginReducerForm = reduxForm({
    form: 'login'
})(LoginForm);

export default Login;

