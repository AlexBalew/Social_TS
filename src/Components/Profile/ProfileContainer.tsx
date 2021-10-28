import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserStatusTC, showUserTC, updateUserStatusTC, UserProfileType} from "../../redux/Reducers/profile-reducer";
import {APPStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirectComponent} from "../../hoc/withAuthRedirectComponent";
import {compose} from "redux";
import {Nullable} from "../../types";

type PathParamsType = {
    userId: string | undefined
}

type MainPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MSTPType = {
    profile: UserProfileType
    status: string
    authorizedUserId: Nullable<number>
    isAuth: boolean
}

type MDTPType = {
    showUserTC: (userId: number) => void
    getUserStatusTC: (userId: number) => void
    updateUserStatusTC: (status: string) => void
}

type ProfileContainerPropsType = MSTPType & MDTPType

class ProfileContainer extends React.Component<MainPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        console.log(userId)
        if (!userId) {
            userId = this.props.authorizedUserId!.toString()
            if (!userId) { //скопировано с гитхаб
                this.props.history.push("/login");
            }
        }
        this.props.showUserTC(+userId)
        this.props.getUserStatusTC(+userId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatusTC={this.props.updateUserStatusTC}/>
        )
    }
}

let mapStateToProps = (state: APPStateType): MSTPType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.authSetting.id,
    isAuth: state.authSetting.isAuth
})

export default compose<React.ComponentType>(
    connect<MSTPType, MDTPType, {}, APPStateType>(
        mapStateToProps, {showUserTC, getUserStatusTC, updateUserStatusTC}),
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
