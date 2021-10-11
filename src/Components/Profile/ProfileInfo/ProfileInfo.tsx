import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../Preloader/Preloader";
import {UserProfileType} from "../../redux/Reducers/profile-reducer";
import userPhoto from "../../../files/images/user-default.png";

type PropsType = {
    profile: UserProfileType
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
            <div>
                <img
                    src='https://www.imagesystems.com.mt/wp-content/uploads/2019/10/Who-we-are-Image-1-1-768x657.png'
                    alt={'main background'}>
                </img>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.small !== null ? props.profile.photos.small : userPhoto} alt={'users avatar'}/>
                <div>{props.profile.fullName}</div>
            </div>
        </div>
    )
};


export default ProfileInfo;
