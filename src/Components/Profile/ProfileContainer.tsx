import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile, UserProfileType} from "../redux/Reducers/profile-reducer";
import {MainReducerType} from "../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {showUser} from "../../API/api";

type PathParamsType = {
    userId: string | undefined
}

type MainPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MSTPType = {
    profile: UserProfileType
}

type MDTPType = {
    setUserProfile: (profile: UserProfileType) => void
}

type ProfileContainerPropsType = MSTPType & MDTPType

class ProfileContainer extends React.Component<MainPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '19866'
        }
        showUser(userId)
            .then(data => {
                this.props.setUserProfile(data)
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: MainReducerType): MSTPType => ({
    profile: state.profilePage.profile
})

let DataFromURLContainerComp = withRouter(ProfileContainer)

export default connect<MSTPType, MDTPType, {}, MainReducerType>(
    mapStateToProps, {
        setUserProfile,
    }
)(DataFromURLContainerComp);
