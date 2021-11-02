import React from "react";
import s from './formControl.module.css'

type TextAreaPropsType = {
    input: any //fix
    meta: any  //fix
}

export const FormControl: React.FC<TextAreaPropsType> = ({
                                                             input,
                                                             meta: {touched, error},
                                                             children,
                                                             ...props
                                                         }) => { //FC?
    const hasError = touched && error
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}

export const TextArea: React.FC<TextAreaPropsType> = (props) => { //FC?
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<TextAreaPropsType> = (props) => { //FC?
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

