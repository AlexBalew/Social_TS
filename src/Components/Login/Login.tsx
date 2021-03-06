import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/formComtrols/formControls";
import {required} from "../../utils/validators/required";
import {connect} from "react-redux";
import {loginTC} from "../../redux/Reducers/auth-reducer";
import {APPStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import s from "./../common/formComtrols/formControl.module.css"
import {Nullable} from "../../types";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    url: Nullable<string>
}

type LoginPropsType = mapStateToPropsLoginType & mapDispatchToPropsLoginType

type mapStateToPropsLoginType = {
    isAuth: boolean
    url: Nullable<string>
}
type mapDispatchToPropsLoginType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}


const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <>
            <h2>Hello there!</h2>
            <ReduxLoginForm onSubmit={onSubmit} />
        </>

    )
}

const mapStateToProps = (state: APPStateType): mapStateToPropsLoginType => ({
    isAuth: state.authSetting.isAuth,
    url: state.authSetting.captchaUrl
})

export default connect<mapStateToPropsLoginType,mapDispatchToPropsLoginType,{},APPStateType>(mapStateToProps, {loginTC})(Login)



export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {

    return (
        <div>
            <div>
            <p>
                To log in, please, get registration <a href={'https://social-network.samuraijs.com/'}
                                                       target={'_blank'}
                                                       rel={"noreferrer"}>here</a>
            </p>
            <p>
                or use these test account credentials:
            </p>
            <p>
                Email: free@samuraijs.com
            </p>
            <p>
                Password: free
            </p>
            </div>
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            {error && <div className={s.errorMessage}>
                {error}
            </div>}
            <button>login</button>
        </form>
        </div>
    )
}

const ReduxLoginForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)