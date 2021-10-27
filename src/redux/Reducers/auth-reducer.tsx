import {Nullable} from "../../types";
import {Dispatch} from "redux";
import {authAPI} from "../../API/api";
import {ThunkDispatch} from "redux-thunk";
import {APPStateType} from "../redux-store";

export type AuthUserType = {
    email: Nullable<string>
    id: Nullable<number>
    login: Nullable<string>
    isAuth: boolean
}

let initialState: AuthUserType = {
    email: null,
    id: null,
    login: null,
    isAuth: false
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export type ResponseUserDataType = {
    id: number
    email: string
    login: string
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

export const getAuthUserDataTC = () => (dispatch: Dispatch<AllAuthReducerACType>) => {
    authAPI.authMe()
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
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<APPStateType, unknown, AllAuthReducerACType>) => {
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserDataTC())
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

