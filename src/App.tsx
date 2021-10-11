import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import {Route} from "react-router-dom";
import {AllACTypes, MainReducerType} from './Components/redux/redux-store';
import {Store} from "redux";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import Friends from "./Components/Friends/Friends";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";


type AppPropsType = {
    dispatch: (action: AllACTypes) => void
    store: Store<MainReducerType, AllACTypes>
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
            </div>
        </div>
    );
}
export default App;