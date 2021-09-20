import React, {ChangeEvent } from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from "../../redux/state";

type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (postMessage: string) => void
    newPostText: string
    UpdateNewPostText: (newText: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(m => <Post message={m.message} likesCounter={m.likesCounter} id={m.id}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const postMessage = () => {
        if (newPostElement.current) {
            props.addPost(newPostElement.current.value)
        }
    }

    let onPostChange =()=> {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.UpdateNewPostText(text)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
            props.UpdateNewPostText(e.currentTarget.value)
    }


    return (
        <div className={classes.postsBlock}>
            <h2>My posts</h2>
            <div>
                <textarea ref={newPostElement} value={props.newPostText} onChange={onChangeHandler}/>
                <div>
                    <button onClick={postMessage}>
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