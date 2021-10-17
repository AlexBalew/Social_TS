import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import {Route} from "react-router-dom";
import {AllACTypes, APPStateType} from './redux/redux-store';
import {Store} from "redux";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import Friends from "./Components/Friends/Friends";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";
import {Settings} from "./Components/Settings/Settings";


type AppPropsType = {
    dispatch: (action: AllACTypes) => void
    store: Store<APPStateType, AllACTypes>
}

const App: React.FC<AppPropsType> = (props) => {


    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path={'/profile/:userId?'}
                       render={() => <ProfileContainer/>}/>
                <Route path={'/dialogs'}
                       render={() => <DialogsContainer/>}/>
                <Route path={'/friends'}
                       render={() => <Friends store={props.store}/>}/>
                <Route path={'/users'}
                       render={() => <UsersContainer/>}/>
                <Route path={'/login'}
                       render={() => <Login />}/>
                <Route path={'/settings'}
                       render={() => <Settings />}/>
            </div>
        </div>
    );
}
export default App;