import React from 'react';
import mod from './Login.module.sass';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";
import {Input} from "../FormControl/FormControl";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";

interface IProps {
    isAuth: boolean
    login: Function
}

interface IMapStateToProps {
    isAuth: boolean
}

interface IFormData {
    email: string
    password: string
    rememberMe: boolean
}

const maxLength20 = maxLengthCreator(20);
const maxLength40 = maxLengthCreator(40);

let LoginForm = (props: any) => {
    return <form onSubmit={props.handleSubmit} className={mod.loginForm}>
        <Field component={Input} name={'email'} placeholder={'Email'}
               validate={[required, maxLength40]}/>
        <Field component={Input} name={'password'} type={'password'} placeholder={'Password'}
               validate={[required, maxLength20]}/>
        <div><Field component={Input} type={'checkbox'} name={'rememberMe'}/>remember me</div>
        <button>Login</button>
    </form>
};

let Login = (props: IProps) => {

    let onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if(props.isAuth){
        return <Redirect to='/'/>
    }

    return (
        <div className={mod.login}>
            <div className={mod.loginTitle}>Login</div>
            <LoginReducerForm onSubmit={onSubmit}/>
            <div className={mod.testData}>
                Тестовые e-mail и password:
                <div>E-mail: <span>free@samuraijs.com</span></div>
                <div>Password: <span>free</span></div>
            </div>
        </div>
    );
};

let LoginReducerForm = reduxForm({
    form: 'login'
})(LoginForm);

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);

