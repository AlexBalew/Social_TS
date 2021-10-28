import {ThunkDispatch} from "redux-thunk";
import {APPStateType} from "../redux-store";
import {authMeTC} from "./auth-reducer";


export type AppInitType = {
    isInitialized: boolean
}

let initialState: AppInitType = {
    isInitialized: false,
}


const appReducer = (state: AppInitType = initialState, action: AllAppReducerACType): AppInitType => {

    switch (action.type) {
        case 'SET_INITIALIZED_SUCCESS': {
            let a = {...state, isInitialized: true} //var is used here for an access to debugger

            return a
        }
        default:
            return state
    }
}

export default appReducer;

type AllAppReducerACType = setUserDataACType

type setUserDataACType = ReturnType<typeof setAppInitializedAC>

export const setAppInitializedAC = () => {
    return {
        type: 'SET_INITIALIZED_SUCCESS',
    } as const
}

export const initializeTC = () => (dispatch: ThunkDispatch<APPStateType, unknown, AllAppReducerACType>) => {
    const promiseAuthMe = dispatch(authMeTC())
    //
    //
    Promise.all([promiseAuthMe])
        .then(() => {
            dispatch(setAppInitializedAC())
        })

}

