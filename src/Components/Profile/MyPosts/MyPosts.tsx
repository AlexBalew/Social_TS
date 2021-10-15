import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {v1} from 'uuid';
import {PostType} from "../../../redux/Reducers/profile-reducer";


type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
}


export const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(m => <Post key={v1()} message={m.message}
                                                   likesCounter={m.likesCounter}
                                                   id={m.id}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        props.addPost()
    }

    const onChangeHandler = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.updateNewPostText(text)
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