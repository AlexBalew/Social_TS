import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {AllACTypes, PostType} from "../../redux/store";
import { v1 } from 'uuid';
import {addPostAC, onChangeHandlerAC} from "../../redux/Reducers/profile-reducer";


type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: AllACTypes) => void
}


const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(m => <Post key={v1()} message={m.message}
                                                   likesCounter={m.likesCounter} //уточнить
                                                   id={m.id}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            let action = addPostAC(text)
            props.dispatch(action)
        }
    }

    const onChangeHandler = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            let action = onChangeHandlerAC(text)
            props.dispatch(action)
        }
    }


    return (
        <div className={classes.postsBlock}>
            <h2>My posts</h2>
            <div>
                <textarea ref={newPostElement} value={props.newPostText} onChange={onChangeHandler}/>
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