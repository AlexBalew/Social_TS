import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Profile from './Components/Profile/Profile';
import {Route} from "react-router-dom";
import {AllACTypes, mainReducerType} from './Components/redux/redux-store';
import {Store} from "redux";
import {RootStateType} from "./index";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";


type AppPropsType = {
    dispatch: (action: AllACTypes) => void
    store: Store<mainReducerType, AllACTypes>
    state: RootStateType
}

const App: React.FC<AppPropsType> = (props) => {


    return (
        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Route path={'/Profile'} render={() => <Profile store={props.store}/>}/>
                <Route path={'/Dialogs'} render={() => <DialogsContainer store={props.store}/>}/>
            </div>
        </div>
    );
}
export default App;