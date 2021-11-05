import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserStatusTC, showUserTC, updateUserStatusTC, UserProfileType, savePhotoTC} from "../../redux/Reducers/profile-reducer";
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
    savePhotoTC: (selectedFile: string | Blob) => void
}

type ProfileContainerPropsType = MSTPType & MDTPType

class ProfileContainer extends React.Component<MainPropsType> {

    refreshProfile () {
        let userId = this.props.match.params.userId
        console.log(userId)
        if (!userId) {
            userId = this.props.authorizedUserId!.toString()
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.showUserTC(+userId)
        this.props.getUserStatusTC(+userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: { match: { params: { userId: string | undefined; }; }; }) {
        if(this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshProfile()
    }

    render() {

        return (
            <Profile {...this.props}
                     isOwner = {!!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatusTC={this.props.updateUserStatusTC}
                     savePhotoTC={this.props.savePhotoTC}
            />
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
        mapStateToProps, {showUserTC, getUserStatusTC, updateUserStatusTC, savePhotoTC}),
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
