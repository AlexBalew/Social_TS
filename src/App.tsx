import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Profile from './Components/Profile/Profile';
import Dialogs from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {
    addPost,
    DialogsPageType,
    ProfilePageType,
    RootStateType,
    SideBarType,
    UpdateNewPostText
} from './Components/redux/state'

type AppPropsType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sideBar: SideBarType
    addPost: (postMessage: string) => void
    UpdateNewPostText: (newText: string) => void
    newPostText: string
}

const App = (props: AppPropsType) => {

    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path={'/Profile'}
                       render={() => <Profile posts={props.profilePage.posts}
                                              addPost={props.addPost}
                                              UpdateNewPostText={props.UpdateNewPostText}
                                              newPostText={props.newPostText}/>}/>
                <Route path={'/Dialogs'} render={() => <Dialogs dialogs={props.dialogsPage.dialogs}
                                                                messages={props.dialogsPage.messages}/>}/>
            </div>
        </div>
    );
}
export default App;