import React from "react";
import {reduxForm, Field, InjectedFormProps} from "redux-form";


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
                <Field placeholder={'login'} name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field component={'input'} name={'remember me'} type={'checkbox'}/> remember me
            </div>
            <button>login</button>
        </form>
    )
}

const ReduxLoginForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)