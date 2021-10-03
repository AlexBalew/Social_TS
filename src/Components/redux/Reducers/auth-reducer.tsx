import {AllACTypes} from "../redux-store";
import {Nullable} from "../../../types";

export type AuthUserType = {
    userId: Nullable<number>
    email: Nullable<string>
    login: Nullable<string>
    isAuth: boolean
}

let initialState: AuthUserType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthUserType = initialState, action: AllACTypes): AuthUserType => {

    switch (action.type) {
        case 'SET_USER_DATA': {
            return {...state, ...action.data, isAuth: true}
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
