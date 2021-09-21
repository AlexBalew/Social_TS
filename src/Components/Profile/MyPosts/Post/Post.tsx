import React from 'react';
import classes from './Post.module.css';
import {PostType} from "../../../redux/store";

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