import React from 'react';
import {AllACTypes, mainReducerType} from "../../redux/redux-store";
import {addPostAC, onChangeHandlerAC} from "../../redux/Reducers/profile-reducer";
import MyPosts from "./MyPosts";
import {Store} from "redux";


type MyPostsContainerPropsType = {
    store: Store<mainReducerType, AllACTypes>
}


const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    let state = props.store.getState()

    const addPost = () => {
        let action = addPostAC(state.profilePage.newPostText)
        props.store.dispatch(action)
    }

    const onChangeHandler = (text: string) => {
        let action = onChangeHandlerAC(text)
        props.store.dispatch(action)
    }


    return (<MyPosts posts={state.profilePage.posts}
                     updateNewPostText={onChangeHandler}
                     newPostText={state.profilePage.newPostText}
                     addPost={addPost}/>)
}

export default MyPostsContainer;