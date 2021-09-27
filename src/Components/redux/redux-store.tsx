import {combineReducers, createStore, Store} from "redux";
import profileReducer, {addPostAC, onChangeHandlerAC} from "./Reducers/profile-reducer";
import dialogsReducer, {sendMessageBodyAC, updateNewMessageBodyAC} from "./Reducers/dialogs-reducer";
import friendsBarReducer from "./Reducers/friendsBar-reducer";
import usersReducer, {
    followAC,
    setCurrentPageAC,
    setTotalUsersAmountAC,
    setUsersAC,
    unfollowAC
} from "./Reducers/users-reducer";


export type AllACTypes = ReturnType<typeof addPostAC> |
    ReturnType<typeof onChangeHandlerAC> |
    ReturnType<typeof updateNewMessageBodyAC> |
    ReturnType<typeof sendMessageBodyAC> |
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof setTotalUsersAmountAC>


export type mainReducerType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsBar: friendsBarReducer,
    usersPage: usersReducer,
})

let store: Store<mainReducerType, AllACTypes> = createStore(mainReducer)

export default store