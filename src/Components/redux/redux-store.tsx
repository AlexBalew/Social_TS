import {combineReducers, createStore, Store} from "redux";
import profileReducer, {
    addPostAC,
    onChangeHandlerAC,
    setUserProfile,
} from "./Reducers/profile-reducer";
import dialogsReducer, {sendMessageBodyAC, updateNewMessageBodyAC} from "./Reducers/dialogs-reducer";
import friendsBarReducer from "./Reducers/friendsBar-reducer";
import usersReducer, {
    follow,
    setCurrentPage,
    setTotalUsersAmount,
    setUsers,
    switchPreloader, unfollow,
} from "./Reducers/users-reducer";


export type AllACTypes = ReturnType<typeof addPostAC> |
    ReturnType<typeof onChangeHandlerAC> |
    ReturnType<typeof updateNewMessageBodyAC> |
    ReturnType<typeof sendMessageBodyAC> |
    ReturnType<typeof follow> |
    ReturnType<typeof unfollow> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersAmount> |
    ReturnType<typeof switchPreloader> |
    ReturnType<typeof setUserProfile>

export type MainReducerType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsBar: friendsBarReducer,
    usersPage: usersReducer,
})

let store: Store<MainReducerType, AllACTypes> = createStore(mainReducer)

export default store