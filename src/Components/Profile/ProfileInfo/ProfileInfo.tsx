import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {UserProfileType} from "../../../redux/Reducers/profile-reducer";
import userPhoto from "../../../files/images/user-default.png";
import ProfileStatus from './ProfileStatus';

type PropsType = {
    profile: UserProfileType
    status: string
    updateUserStatusTC: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {

    const isProfileEmpty = (profile: {} | UserProfileType): boolean => {
        for (const key in profile) {
            if (Object.prototype.hasOwnProperty.call(profile, key)) {
                return false;
            }
        }
        return true;
    };

    if (isProfileEmpty(props.profile)) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.small !== null ? props.profile.photos.small : userPhoto} alt={'users avatar'}/>
                <div>{props.profile.fullName}</div>
                <span>My status:</span> <ProfileStatus status={props.status} updateUserStatusTC={props.updateUserStatusTC}/>
            </div>
        </div>
    )
};


export default ProfileInfo;
