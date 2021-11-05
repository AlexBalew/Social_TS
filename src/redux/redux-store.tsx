import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {addPostAC, setUserProfile, setUserStatus, updatePhotoAC,} from "./Reducers/profile-reducer";
import dialogsReducer, {sendNewDialogMessageAC} from "./Reducers/dialogs-reducer";
import friendsBarReducer from "./Reducers/friendsBar-reducer";
import usersReducer, {
    followAC,
    followedUsersIdAC,
    setCurrentPage,
    setFilterAC,
    setTotalUsersAmount,
    setUsers,
    switchPreloader,
    unFollowAC,
} from "./Reducers/users-reducer";
import authReducer from "./Reducers/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from "./Reducers/app-reducer";


export type AllACType = ReturnType<typeof addPostAC> |
    ReturnType<typeof sendNewDialogMessageAC> |
    ReturnType<typeof followAC> |
    ReturnType<typeof unFollowAC> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersAmount> |
    ReturnType<typeof switchPreloader> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof followedUsersIdAC> |
    ReturnType<typeof setUserStatus> |
    ReturnType<typeof setFilterAC> |
    ReturnType<typeof updatePhotoAC>

export type APPStateType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsBar: friendsBarReducer,
    usersPage: usersReducer,
    authSetting: authReducer,
    app: appReducer,
    form: formReducer
})

//let store: Store<APPStateType, AllACType> = createStore(mainReducer, applyMiddleware(thunkMiddleware))
//let store = createStore(mainReducer, applyMiddleware(thunkMiddleware))
//export type AppStoreType = typeof store

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store