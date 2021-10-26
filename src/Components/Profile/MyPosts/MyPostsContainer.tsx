import {addPostAC, PostType} from "../../../redux/Reducers/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {APPStateType} from "../../../redux/redux-store";


export type mapDispatchToPropsType = {
    addPost: (newPost: string) => void
}

export type mapStateToPropsType = {
    posts: Array<PostType>
}


const mapStateToProps = (state: APPStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addPost: (newPost: string) => {
            let action = addPostAC(newPost)
            dispatch(action)
        }
    }
}

const MyPostsContainerWithConnect = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainerWithConnect;