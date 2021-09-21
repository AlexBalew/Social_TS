import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Profile from './Components/Profile/Profile';
import Dialogs from "./Components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {AllACTypes} from './Components/redux/store'



type AppPropsType = {
    dispatch: (action: AllACTypes) => void
    store: any //need to be fixed
}

const App: React.FC<AppPropsType> = (props) => {

    const state = props.store.getState()

    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path={'/Profile'}
                       render={() => <Profile posts={state.profilePage.posts}
                                              dispatch={props.dispatch}
                                              newPostText={state.profilePage.newPostText}/>}/>
                <Route path={'/Dialogs'} render={() => <Dialogs dialogs={state.dialogsPage.dialogs}
                                                                messages={state.dialogsPage.messages}
                                                                newMessageBody={state.dialogsPage.newMessageBody}
                                                                dispatch={props.dispatch}
                />}/>
            </div>
        </div>
    );
}
export default App;