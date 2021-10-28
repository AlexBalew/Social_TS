import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logOutTC} from "../../redux/Reducers/auth-reducer";
import {Nullable} from "../../types";
import {APPStateType} from "../../redux/redux-store";

type AuthPropsType = MSTPType & MDTPType

type MSTPType = {
    isAuth: boolean
    login: Nullable<string>
}

type MDTPType = {
    logOutTC: () => void
}

class HeaderContainer extends React.Component<AuthPropsType> {


    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: APPStateType): MSTPType => ({
    isAuth: state.authSetting.isAuth,
    login: state.authSetting.login,
})


export default connect(mapStateToProps, {logOutTC})(HeaderContainer);
