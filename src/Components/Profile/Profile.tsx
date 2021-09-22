import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AllACTypes, mainReducerType} from "../redux/redux-store";
import classes from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Store} from "redux";


type ProfilePropsType = {
    store: Store<mainReducerType, AllACTypes>
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}


export default Profile;
