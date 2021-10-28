import {Nullable} from "../../types";
import {Dispatch} from "redux";
import {authAPI} from "../../API/api";
import {ThunkDispatch} from "redux-thunk";
import {APPStateType} from "../redux-store";
import {FormAction, stopSubmit} from "redux-form";

export type AuthUserType = {
    email: Nullable<string>
    id: Nullable<number>
    login: Nullable<string>
    isAuth: boolean
}

let initialState: AuthUserType = {
    email: null,
    id: null, //null крашит приложение(profile container)
    login: null,
    isAuth: false
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}


const authReducer = (state: AuthUserType = initialState, action: AllAuthReducerACType): AuthUserType => {

    switch (action.type) {
        case 'SET_USER_DATA': {
                 let a = {...state, ...action.data} //var is used here for an access to debugger isAuth??
            return a
        }
        default:
            return state
    }
}

export default authReducer;

type AllAuthReducerACType = setUserDataACType

type setUserDataACType = ReturnType<typeof setUserDataAC>

export const setUserDataAC = (data: AuthUserType) => {
    return {
        type: 'SET_USER_DATA',
        data,
    } as const
}

export const authMeTC = () => (dispatch: Dispatch<AllAuthReducerACType>) => {
    return authAPI.authMe() //return для корректной работы initializeTC Promise.all
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserDataAC({
                    login: data.data.login,
                    id: data.data.id,
                    email: data.data.email,
                    isAuth: true
                }))
                console.log(data.data)
            }
        });
}
//dispatch: Dispatch<AllAuthReducerACType>
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<APPStateType, unknown, AllAuthReducerACType | FormAction>) => {

    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authMeTC())
            } else {
                if (data.messages[0].length > 0) {
                    dispatch(stopSubmit('login', {_error: data.messages[0]}))
                }
            }
        });
}

export const logOutTC = () => (dispatch: ThunkDispatch<APPStateType, unknown, AllAuthReducerACType>) => {
    authAPI.logOut()
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(setUserDataAC({login: null, id: null, email: null, isAuth: false}))
            }
        });
}

