import {follow, getUsers, unFollow} from "../../../API/api";
import {AllACTypes} from "../redux-store";
import {Dispatch} from "redux";

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: {
        small: string
        large: string
    }
    status: string
    followed: boolean
}

export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    isFetching: boolean
    followedUsersId: number[]
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersAmount: 100,
    currentPage: 1,
    isFetching: false,
    followedUsersId: [],
}

const usersReducer = (state: UsersPageType = initialState, action: AllACTypes): UsersPageType => {

    switch (action.type) {
        case 'FOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}
        }
        case 'UNFOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}
        }
        case 'SET_USERS': {

            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_AMOUNT': {
            return {...state, totalUsersAmount: action.totalAmount}
        }
        case 'SWITCH_PRELOADER': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SWITCH_IS_FOLLOW': {
            return {
                ...state,
                followedUsersId: action.isFetching ? [...state.followedUsersId, action.id] : state.followedUsersId.filter(id => id !== action.id)
            }
        }
        default:
            return state
    }
}

export default usersReducer;


export const followAC = (userID: number) => {
    return {
        type: 'FOLLOW',
        userID,
    } as const
}

export const unFollowAC = (userID: number) => {
    return {
        type: 'UNFOLLOW',
        userID,
    } as const
}

export const setUsers = (users: Array<UserType>) => {

    return {
        type: 'SET_USERS',
        users,
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage,
    } as const
}

export const setTotalUsersAmount = (totalAmount: number) => {
    return {
        type: 'SET_TOTAL_USERS_AMOUNT',
        totalAmount,
    } as const
}

export const switchPreloader = (isFetching: boolean) => {
    return {
        type: 'SWITCH_PRELOADER',
        isFetching
    } as const
}

export const followedUsersIdAC = (id: number, isFetching: boolean) => {
    return {
        type: 'SWITCH_IS_FOLLOW',
        id,
        isFetching
    } as const
}


export const getUsersTC = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(switchPreloader(true))
    getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(switchPreloader(false))
            dispatch(setUsers(data.items))
            // dispatch(setTotalUsersAmount(data.totalCount)) //проверить, что этот параметр приходит в дата
        });
}

export const followUserTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(followedUsersIdAC(userId, true))
    follow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(followedUsersIdAC(userId, false))
        });
}

export const unFollowUserTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(followedUsersIdAC(userId, true))
    unFollow(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unFollowAC(userId))
            }
            dispatch(followedUsersIdAC(userId, false))
        });
}