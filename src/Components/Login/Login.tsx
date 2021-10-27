import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/formComtrols/formControls";
import {required} from "../../utils/validators/required";
import {connect} from "react-redux";
import {loginTC} from "../../redux/Reducers/auth-reducer";
import {APPStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginPropsType = mapStateToPropsLoginType & mapDispatchToPropsLoginType

type mapStateToPropsLoginType = {
    isAuth: boolean
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
            <h2>login</h2>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </>

    )
}

const mapStateToProps = (state: APPStateType): mapStateToPropsLoginType => ({
    isAuth: state.authSetting.isAuth
})

export default connect<mapStateToPropsLoginType,mapDispatchToPropsLoginType,{},APPStateType>(mapStateToProps, {loginTC})(Login)



export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
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
            <button>login</button>
        </form>
    )
}

const ReduxLoginForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)