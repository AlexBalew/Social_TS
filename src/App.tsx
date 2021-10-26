import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import {Route} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Login} from "./Components/Login/Login";
import {Settings} from "./Components/Settings/Settings";


const App: React.FC = () => {


    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path={'/profile/:userId?'}
                       render={() => <ProfileContainer/>}/>
                <Route path={'/dialogs'}
                       render={() => <DialogsContainer/>}/>
                {/*<Route path={'/friends'}
                       render={() => <Friends />}/>*/}
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