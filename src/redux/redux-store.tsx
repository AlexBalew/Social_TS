import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import profileReducer, {
    addPostAC,
    onChangeHandlerAC,
    setUserProfile, setUserStatus,
} from "./Reducers/profile-reducer";
import dialogsReducer, {sendMessageBodyAC, updateNewMessageBodyAC} from "./Reducers/dialogs-reducer";
import friendsBarReducer from "./Reducers/friendsBar-reducer";
import usersReducer, {
    followAC, followedUsersIdAC,
    setCurrentPage, setFilterAC,
    setTotalUsersAmount,
    setUsers,
    switchPreloader, unFollowAC,
} from "./Reducers/users-reducer";
import authReducer, {setUserDataAC} from "./Reducers/auth-reducer";
import thunkMiddleware from 'redux-thunk'


export type AllACType = ReturnType<typeof addPostAC> |
    ReturnType<typeof onChangeHandlerAC> |
    ReturnType<typeof updateNewMessageBodyAC> |
    ReturnType<typeof sendMessageBodyAC> |
    ReturnType<typeof followAC> |
    ReturnType<typeof unFollowAC> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersAmount> |
    ReturnType<typeof switchPreloader> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setUserDataAC> |
    ReturnType<typeof followedUsersIdAC> |
    ReturnType<typeof setUserStatus> |
    ReturnType<typeof setFilterAC>

export type APPStateType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsBar: friendsBarReducer,
    usersPage: usersReducer,
    authSetting: authReducer
})

let store: Store<APPStateType, AllACType> = createStore(mainReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store