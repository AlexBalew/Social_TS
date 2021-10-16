import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {showUserTC, UserProfileType} from "../../redux/Reducers/profile-reducer";
import {APPStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

type MainPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MSTPType = {
    profile: UserProfileType
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
            userId = "19866"
        }
        this.props.showUserTC(+userId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: APPStateType): MSTPType => ({
    profile: state.profilePage.profile
})

export default compose<React.ComponentType>(
    connect<MSTPType, MDTPType, {}, APPStateType>(
        mapStateToProps, {showUserTC}),
    withRouter,
    withAuthRedirectComponent
)(ProfileContainer)

/*
let AuthRedirectComponent = withAuthRedirectComponent(ProfileContainer)


let DataFromURLContainerComp = withRouter(AuthRedirectComponent)

export default connect<MSTPType, MDTPType, {}, APPStateType>(
    mapStateToProps, {
        showUserTC
    }
)(DataFromURLContainerComp);
*/
