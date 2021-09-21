import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AllACTypes, PostType} from "../redux/store";
import classes from './Profile.module.css'


type ProfilePropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: AllACTypes) => void
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}
                     dispatch={props.dispatch}
                     newPostText={props.newPostText} />
        </div>
    )
}


export default Profile;
