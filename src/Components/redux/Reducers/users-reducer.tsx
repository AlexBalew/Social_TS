import {AllACTypes} from "../redux-store";

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
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersAmount: 100,
    currentPage: 1,
    isFetching: false
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
        default:
            return state
    }
}

export default usersReducer;


export const follow = (userID: number) => {
    return {
        type: 'FOLLOW',
        userID,
    } as const
}

export const unfollow = (userID: number) => {
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