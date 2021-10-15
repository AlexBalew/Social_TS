import React from 'react';
import { PostType } from '../../../../redux/Reducers/profile-reducer';
import classes from './Post.module.css';


const Post = (props: PostType) => {
    return (
        <div className={classes.item}>
            {props.id + '. '}{props.message}
            <div>
                <span>likes </span>{props.likesCounter}
            </div>
        </div>
    )
};

export default Post;