import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AuthUserType, setUserDataAC} from "../redux/Reducers/auth-reducer";
import {Nullable} from "../../types";

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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.setUserDataAC(response.data.data)
                }
            });
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: MSTPType) => ({
    isAuth: state.isAuth,
    login: state.login,
})


export default connect(mapStateToProps, {setUserDataAC})(HeaderContainer);
