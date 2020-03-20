import React from 'react';
import './Login.css';
import {Field, reduxForm} from "redux-form";

export let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={'input'} name={'login'} />
        <Field component={'input'} name={'password'} />
        <Field component={'input'} type={'checkbox'} name={'rememberMe'} />
        <button>Send</button>
    </form>
};

let Login = () => {

    let onSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div>
            <div>Login</div>
            <LoginReducerForm onSubmit={onSubmit}/>
        </div>
    );
};

export let LoginReducerForm = reduxForm({
form: 'login'
})(LoginForm);


export default Login;

