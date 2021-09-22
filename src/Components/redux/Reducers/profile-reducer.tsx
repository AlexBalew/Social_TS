import {AllACTypes} from "../redux-store";

export type PostType = {
    id: number
    message: string
    likesCounter: number
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

let initialState: ProfilePageType = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCounter: 15},
        {id: 2, message: 'Fine, thanks', likesCounter: 25},
        {id: 3, message: 'WHOOP WHOOP!', likesCounter: 48},
    ],
}

const profileReducer = (state: ProfilePageType = initialState, action: AllACTypes): ProfilePageType => {

    switch (action.type) {
        case 'ADD_POST':
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likesCounter: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state;
        case 'UPDATE_NEW_POST_TEXT':
            state.newPostText = action.newText
            return state;
        default:
            return state
    }
}

export default profileReducer;
export const addPostAC = (text: string) => {
    return {
        type: 'ADD_POST',
        newPostText: text
    } as const
}

export const onChangeHandlerAC = (text: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newText: text
    } as const
}