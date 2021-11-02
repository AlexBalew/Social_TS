import {APPStateType} from "../redux-store";
import {createSelector} from "reselect";
import {UserType} from "../Reducers/users-reducer";

export const getUsers = (state: APPStateType) => {
    return state.usersPage.users
}

export const getUsersSuper = createSelector(getUsers, (users: Array<UserType>) => {
    return users
})

export const getPageSize = (state: APPStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersAmount = (state: APPStateType) => {
    return state.usersPage.totalUsersAmount
}

export const getCurrentPage = (state: APPStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: APPStateType) => {
    return state.usersPage.isFetching
}

export const getFollowedUsersId = (state: APPStateType) => {
    return state.usersPage.followedUsersId
}

export const getFilter = (state: APPStateType) => {
    return state.usersPage.filter
}