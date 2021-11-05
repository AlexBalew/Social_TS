import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import classes from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../../redux/Reducers/profile-reducer";

type PropsType = {
    profile: UserProfileType
    status: string
    updateUserStatusTC: (status: string) => void
    isOwner: boolean
    savePhotoTC: (selectedFile: string | Blob) => void
}

const Profile = (props: PropsType) => {
    return (
        <div className={classes.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatusTC={props.updateUserStatusTC}
                         isOwner={props.isOwner}
                         savePhotoTC={props.savePhotoTC}
            />
            <MyPostsContainer />
        </div>
    )
}


export default Profile;
