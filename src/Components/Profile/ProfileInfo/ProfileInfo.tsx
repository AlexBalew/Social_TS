import React from 'react';
import classes from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src='https://www.imagesystems.com.mt/wp-content/uploads/2019/10/Who-we-are-Image-1-1-768x657.png'>
                </img>
            </div>
            <div className={classes.descriptionBlock}>
                ava+description
            </div>
        </div>
    )
};


export default ProfileInfo;
