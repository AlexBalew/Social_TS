import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../redux/state";
import classes from './Profile.module.css'

const Profile = (props: ProfilePageType) => {

    return (
        <div className={classes.content} >
            <ProfileInfo/>
            <MyPosts posts = {props.posts}/>
        </div>
    )
}


export default Profile;
