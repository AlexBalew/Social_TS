import {AllACTypes} from "../redux-store";
import {Nullable} from "../../types";
import {authMe} from "../../API/api";
import {Dispatch} from "redux";

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

const authReducer = (state: AuthUserType = initialState, action: AllACTypes): AuthUserType => {

    switch (action.type) {
        case 'SET_USER_DATA': {
            let a = {...state, ...action.data, isAuth: true} //var is used here for an access to debugger
            return a
        }
        default:
            return state
    }
}

export default authReducer;


export const setUserDataAC = (data: AuthUserType) => {
    return {
        type: 'SET_USER_DATA',
        data,
    } as const
}

export const getAuthUserDataTC = () => (dispatch: Dispatch) => {//типизировать
    authMe()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserDataAC(data.data))
            }
        });
}
