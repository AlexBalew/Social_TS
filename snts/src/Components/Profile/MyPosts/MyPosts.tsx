import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {PostsType} from "../../redux/state";

type MyPostsPropsType = {
    posts:PostsType
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(m => <Post message={m.message} likesCounter={m.likesCounter} id={m.id}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        let text = newPostElement.current;
        alert(text);
    }

    return (
        <div className={classes.postsBlock}>
            <h2>My posts</h2>
            <div>
                <textarea ref={newPostElement}></textarea>
                <div>
                    <button onClick={addPost}>
                        Add post
                    </button>
                </div>
                <div>
                    <button>
                        Delete
                    </button>
                </div>
                <div>
                    New post
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;