import store from "./Components/redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ProfilePageType} from "./Components/redux/Reducers/profile-reducer";
import {DialogsPageType} from './Components/redux/Reducers/dialogs-reducer';
import {FriendsBarType} from './Components/redux/Reducers/friendsBar-reducer';
import {Provider} from "react-redux";
import {UsersPageType} from "./Components/redux/Reducers/users-reducer";

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    friendsBar: FriendsBarType
    usersPage: UsersPageType
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App dispatch={store.dispatch.bind(store)}
                 store={store}/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

