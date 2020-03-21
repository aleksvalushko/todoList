import React from 'react';
import './Login.css';
import {Field, reduxForm} from "redux-form";

export let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit} className='loginForm'>
        <Field component={'input'} name={'login'} placeholder={'Login'} />
        <Field component={'input'} name={'password'} type={'password'} placeholder={'Password'} />
        <div><Field component={'input'} type={'checkbox'} name={'rememberMe'} />remember me</div>
        <button>Send</button>
    </form>
};

let Login = () => {

    let onSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div className='login'>
            <div className='loginTitle'>Login</div>
            <LoginReducerForm onSubmit={onSubmit}/>
        </div>
    );
};

export let LoginReducerForm = reduxForm({
form: 'login'
})(LoginForm);


export default Login;

