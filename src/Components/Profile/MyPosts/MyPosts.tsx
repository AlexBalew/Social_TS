import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {v1} from 'uuid';
import {PostType} from "../../../redux/Reducers/profile-reducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";


type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (newPost: string) => void
}

type NewPostFormDataType = {
    newPost: string
}


export const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(m => <Post key={v1()} message={m.message}
                                                   likesCounter={m.likesCounter}
                                                   id={m.id}/>)


    const addNewPost = (values: NewPostFormDataType) => {
        props.addPost(values.newPost)
    }

    return (
        <div className={classes.postsBlock}>
            <h2>My posts</h2>
            <NewPostReduxForm onSubmit={addNewPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;

export const AddNewPostForm: React.FC<InjectedFormProps<NewPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'newPost'} component={'textarea'}/>
            <div>
                <button>
                    Add post
                </button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm<NewPostFormDataType>({
    form: 'newPost'
})(AddNewPostForm)