import {Nullable} from "../../types";
import {Dispatch} from "redux";
import {authAPI, secureAPI} from "../../API/api";
import {ThunkDispatch} from "redux-thunk";
import {APPStateType} from "../redux-store";
import {FormAction, stopSubmit} from "redux-form";

export type AuthUserType = {
    email: Nullable<string>
    id: Nullable<number>
    login: Nullable<string>
    isAuth: boolean
    captchaUrl: Nullable<string>
}

let initialState: AuthUserType = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export type ResponseCaptchaType = {
    url: string
}


const authReducer = (state: AuthUserType = initialState, action: AllAuthReducerACType): AuthUserType => {

    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            let a = {...state, ...action.data} //var is used here for an access to debugger isAuth??
            return a
        }
        case 'auth/GET_CAPTCHA': {
            return {...state, captchaUrl: action.url}
        }
        default:
            return state
    }
}

export default authReducer;

type AllAuthReducerACType = setUserDataACType | getCaptchaACType

type setUserDataACType = ReturnType<typeof setUserDataAC>

export const setUserDataAC = (data: AuthUserType) => {
    return {
        type: 'auth/SET_USER_DATA',
        data,
    } as const
}

type getCaptchaACType = ReturnType<typeof getCaptchaAC>

export const getCaptchaAC = (url: string) => {
    return {
        type: 'auth/GET_CAPTCHA',
        url
    } as const
}

export const authMeTC = () => async (dispatch: Dispatch<AllAuthReducerACType>) => {
    let response = await authAPI.authMe()
    if (response.resultCode === 0) {
        dispatch(setUserDataAC({
            login: response.data.login,
            id: response.data.id,
            email: response.data.email,
            isAuth: true,
            captchaUrl: null
        }))
    }
}

//dispatch: Dispatch<AllAuthReducerACType>
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<APPStateType, unknown, AllAuthReducerACType | FormAction>) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.resultCode === 0) {
        dispatch(authMeTC())
    } else {
        if(response.resultCode === 10) {
            dispatch(getCaptchaTC())
        }
        if (response.messages[0].length > 0) {
            dispatch(stopSubmit('login', {_error: response.messages[0]}))
        }
    }
}

export const logOutTC = () => async (dispatch: ThunkDispatch<APPStateType, unknown, AllAuthReducerACType>) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setUserDataAC({login: null, id: null, email: null, isAuth: false, captchaUrl: null}))
    }
}

export const getCaptchaTC = () => async (dispatch: ThunkDispatch<APPStateType, unknown, AllAuthReducerACType>) => {
    let response = await secureAPI.getCaptcha()
    if (response.data.url) {
        const captcha = response.data.url
        dispatch(getCaptchaAC(captcha))
    }
}


