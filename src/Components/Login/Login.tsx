import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import { Input } from "../common/formComtrols/formControls";
import {required} from "../../utils/validators/required";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <>
            <h2>login</h2>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </>

    )
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'Login'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'}
                       component={Input} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'remember me'} type={'checkbox'}/> remember me
            </div>
            <button>login</button>
        </form>
    )
}

const ReduxLoginForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)