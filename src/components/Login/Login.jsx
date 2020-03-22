import React from 'react';
import mod from './Login.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";

const maxLength20 = maxLengthCreator(20);

export let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit} className='loginForm'>
        <Field component={'input'} name={'login'} placeholder={'Login'}
               validate={[required, maxLength20]}/>
        <Field component={'input'} name={'password'} type={'password'} placeholder={'Password'}
               validate={[required, maxLength20]}/>
        <div><Field component={'input'} type={'checkbox'} name={'rememberMe'}/>remember me</div>
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

