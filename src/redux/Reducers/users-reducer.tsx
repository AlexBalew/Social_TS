import {follow, requestUsers, unFollow} from "../../API/api";
import {AllACType} from "../redux-store";
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

export type FilterFormType = typeof initialState.filter

export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    isFetching: boolean
    followedUsersId: number[]
    filter: {
        term: string
        friend: null | boolean
    }

}

let initialState: UsersPageType = {
    users: [],
    pageSize: 8,
    totalUsersAmount: 0,
    currentPage: 1,
    isFetching: false,
    followedUsersId: [],
    filter: {
        term: '',
        friend: null,
    }
}

const usersReducer = (state: UsersPageType = initialState, action: AllACType): UsersPageType => {

    switch (action.type) {
        case 'users/FOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}
        }
        case 'users/UNFOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}
        }
        case 'users/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'users/SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'users/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'users/SET_TOTAL_USERS_AMOUNT': {
            return {...state, totalUsersAmount: action.totalAmount}
        }
        case 'users/SWITCH_PRELOADER': {
            return {...state, isFetching: action.isFetching}
        }
        case 'users/SWITCH_IS_FOLLOW': {
            return {
                ...state,
                followedUsersId: action.isFetching
                    ? [...state.followedUsersId, action.id]
                    : state.followedUsersId.filter(id => id !== action.id)
            }
        }
        default:
            return state
    }
}

export default usersReducer;


export const followAC = (userID: number) => {
    return {
        type: 'users/FOLLOW',
        userID,
    } as const
}

export const unFollowAC = (userID: number) => {
    return {
        type: 'users/UNFOLLOW',
        userID,
    } as const
}

export const setUsers = (users: Array<UserType>) => {

    return {
        type: 'users/SET_USERS',
        users,
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'users/SET_CURRENT_PAGE',
        currentPage,
    } as const
}

export const setTotalUsersAmount = (totalAmount: number) => {
    return {
        type: 'users/SET_TOTAL_USERS_AMOUNT',
        totalAmount,
    } as const
}

export const switchPreloader = (isFetching: boolean) => {
    return {
        type: 'users/SWITCH_PRELOADER',
        isFetching
    } as const
}

export const followedUsersIdAC = (id: number, isFetching: boolean) => {
    return {
        type: 'users/SWITCH_IS_FOLLOW',
        id,
        isFetching
    } as const
}

export const setFilterAC = (filter: FilterFormType) => {
    return {
        type: 'users/SET_FILTER',
        payload: filter,
    } as const
}


export const getUsersTC = (page: number, pageSize: number, filter: FilterFormType) => async (dispatch: Dispatch) => {
    dispatch(switchPreloader(true))
    dispatch(setFilterAC(filter))
    //dispatch(setCurrentPage(page))
    let response = await requestUsers(page, pageSize, filter.term, filter.friend)
            dispatch(switchPreloader(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsersAmount(response.totalCount)) //проверить, что этот параметр приходит в дата
}


export const followUserTC = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(followedUsersIdAC(userId, true))
    let response = await follow(userId)
            if (response.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(followedUsersIdAC(userId, false))
}

export const unFollowUserTC = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(followedUsersIdAC(userId, true))
   let response = await unFollow(userId)
            if (response.resultCode === 0) {
                dispatch(unFollowAC(userId))
            }
            dispatch(followedUsersIdAC(userId, false))
}