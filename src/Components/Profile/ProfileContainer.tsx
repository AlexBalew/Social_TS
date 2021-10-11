import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {showUserTC, UserProfileType} from "../redux/Reducers/profile-reducer";
import {MainReducerType} from "../redux/redux-store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

type PathParamsType = {
    userId: string
}

type MainPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MSTPType = {
    profile: UserProfileType
    isAuth: boolean
}

type MDTPType = {
    showUserTC: (userId: number) => void
}

type ProfileContainerPropsType = MSTPType & MDTPType

class ProfileContainer extends React.Component<MainPropsType> {

    componentDidMount() {
        let userId: string | undefined = this.props.match.params.userId
        console.log(userId)
        if (!userId) {
            userId = "2"
        }
        this.props.showUserTC(+userId)
    }

    render() {

        if(!this.props.isAuth) return <Redirect to='/login' />

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: MainReducerType): MSTPType => ({
    profile: state.profilePage.profile,
    isAuth: state.authSetting.isAuth
})

let DataFromURLContainerComp = withRouter(ProfileContainer)

export default connect<MSTPType, MDTPType, {}, MainReducerType>(
    mapStateToProps, {
        showUserTC
    }
)(DataFromURLContainerComp);
