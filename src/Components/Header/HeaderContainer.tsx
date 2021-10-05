import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AuthUserType, setUserDataAC} from "../redux/Reducers/auth-reducer";
import {Nullable} from "../../types";
import {MainReducerType} from "../redux/redux-store";
import {authMe} from "../../API/api";

type AuthPropsType = MSTPType & MDTPType

type MSTPType = {
    isAuth: boolean
    login: Nullable<string>
}

type MDTPType = {
    setUserDataAC: (data: AuthUserType) => void
}

class HeaderContainer extends React.Component<AuthPropsType> {

    componentDidMount() {
        authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.setUserDataAC(data.data)
                }
            });
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: MainReducerType): MSTPType => ({
    isAuth: state.authSetting.isAuth,
    login: state.authSetting.login,
})


export default connect(mapStateToProps, {setUserDataAC})(HeaderContainer);
