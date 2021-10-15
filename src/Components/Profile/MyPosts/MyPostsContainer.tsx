import {addPostAC, onChangeHandlerAC, PostType} from "../../../redux/Reducers/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from 'react-redux';
import {RootStateType} from "../../../index";
import { Dispatch } from 'redux';


export type mapDispatchToPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}

export type mapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string
}


const mapStateToProps = (state: RootStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => {
            let action = onChangeHandlerAC(text)
            dispatch(action)
        },
        addPost: () => {
            let action = addPostAC()
            dispatch(action)
        }
    }
}

const MyPostsContainerWithConnect = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainerWithConnect;