import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostType} from "../redux/state";
import classes from './Profile.module.css'


type ProfilePropsType = {
    posts: Array<PostType>
    addPost: (postMessage: string) => void
    UpdateNewPostText: (newText: string) => void
    newPostText: string
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={classes.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost}
                     UpdateNewPostText={props.UpdateNewPostText}
                     newPostText={props.newPostText} />
        </div>
    )
}


export default Profile;
