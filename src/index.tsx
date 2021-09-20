import reportWebVitals from './reportWebVitals';
import state, {subscribe} from "./Components/redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import {
    addPost,
    RootStateType,
    UpdateNewPostText
} from "./Components/redux/state";

export let rerenderEntireTree = (props: RootStateType) => {

    ReactDOM.render(
        <BrowserRouter>
            <App profilePage={props.profilePage}
                 sideBar={props.sideBar}
                 dialogsPage={props.dialogsPage}
                 addPost={addPost}
                 UpdateNewPostText={UpdateNewPostText}
                 newPostText={props.profilePage.newPostText}/>
        </BrowserRouter>,
        document.getElementById('root')
    );

}

reportWebVitals();

rerenderEntireTree(state)

subscribe(rerenderEntireTree)

reportWebVitals();
