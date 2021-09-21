import {combineReducers, createStore} from "redux";
import profileReducer from "./Reducers/profile-reducer";
import dialogsReducer from "./Reducers/dialogs-reducer";
import friendsBarReducer from "./Reducers/friendsBar-reducer";

export type mainReducerType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsBar: friendsBarReducer
})

let store = createStore(mainReducer)

export default store