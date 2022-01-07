import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {Settings} from "./Components/Settings/Settings";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeTC} from "./redux/Reducers/app-reducer";
import store, {APPStateType} from "./redux/redux-store";
import Preloader from "./Components/common/Preloader/Preloader";

type APPPropsType = MSTPType & MDTPType

type MSTPType = {
    isInitialized: boolean
}

type MDTPType = {
    initializeTC: () => void
}

class App extends React.Component<APPPropsType> {

    componentDidMount() {
        this.props.initializeTC()
    }

    render() {
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>

                <div className='app-wrapper-content'>
                    <Nav/>
                    <Switch>
                        <Route path={'/profile/:userId?'}
                               render={() => <ProfileContainer/>}/>
                        <Route path={'/dialogs'}
                               render={() => <DialogsContainer/>}/>
                        {/*<Route path={'/friends'}
                       render={() => <Friends />}/>*/}
                        <Route path={'/users'}
                               render={() => <UsersContainer/>}/>
                        <Route path={'/login'}
                               render={() => <Login/>}/>
                        <Route path={'/settings'}
                               render={() => <Settings/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: APPStateType) => ({
    isInitialized: state.app.isInitialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MSTPType, MDTPType, {}, APPStateType>(mapStateToProps, {initializeTC}))(App);

export const SocialNetworkApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

