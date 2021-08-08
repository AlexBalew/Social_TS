import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Profile from './Components/Profile/Profile';
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {PostsType, RootStateType} from "./Components/redux/state";
import MyPosts from "./Components/Profile/MyPosts/MyPosts";


const App = (props: RootStateType) => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route path={'/Profile'} render={() => <Profile posts={props.profilePage.posts}/>}/>
                    <Route path={'/Dialogs'} render={() => <Dialogs dialogs={props.dialogsPage.dialogs}
                                                                    messages={props.dialogsPage.messages}/>}/>
                </div>

            </div>
        </BrowserRouter>
    );
}
export default App;