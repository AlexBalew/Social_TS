import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import classes from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {UserProfileType} from "../redux/Reducers/profile-reducer";

type PropsType = {
    profile: UserProfileType
}

const Profile = (props: PropsType) => {
    return (
        <div className={classes.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}


export default Profile;
