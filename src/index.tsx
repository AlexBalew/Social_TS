import reportWebVitals from './reportWebVitals';
import store from "./Components/redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ProfilePageType} from "./Components/redux/Reducers/profile-reducer";
import { DialogsPageType } from './Components/redux/Reducers/dialogs-reducer';
import { FriendsBarType } from './Components/redux/Reducers/friendsBar-reducer';

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    friendsBar: FriendsBarType
}

export let reRenderEntireTree = (state: RootStateType) => {

    ReactDOM.render(
        <BrowserRouter>
            <App dispatch={store.dispatch.bind(store)}
                 state={state}
                 store={store}/>
        </BrowserRouter>,
        document.getElementById('root')
    );

}

reportWebVitals();

reRenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    reRenderEntireTree(state)
})

reportWebVitals();
