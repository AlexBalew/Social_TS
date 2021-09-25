import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Profile from './Components/Profile/Profile';
import {Route} from "react-router-dom";
import {AllACTypes, mainReducerType} from './Components/redux/redux-store';
import {Store} from "redux";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import Friends from "./Components/Friends/Friends";


type AppPropsType = {
    dispatch: (action: AllACTypes) => void
    store: Store<mainReducerType, AllACTypes>
}

const App: React.FC<AppPropsType> = (props) => {


    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path={'/Profile'} render={() => <Profile />}/>
                <Route path={'/Dialogs'} render={() => <DialogsContainer />}/>
                <Route path={'/Friends'} render={() => <Friends store={props.store}/>}/>
            </div>
        </div>
    );
}
export default App;