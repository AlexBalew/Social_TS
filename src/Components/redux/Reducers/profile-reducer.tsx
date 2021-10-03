import {AllACTypes} from "../redux-store";
import {Nullable} from '../../../types';

export type PostType = {
    id: number
    message: string
    likesCounter: number
}

export type UserProfileType = {
    aboutMe: string
    contacts: {
        facebook: Nullable<string>
        website: Nullable<string>
        vk: Nullable<string>
        twitter: Nullable<string>
        instagram: Nullable<string>
        youtube: Nullable<string>
        github: Nullable<string>
        mainLink: Nullable<string>
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: UserProfileType
}

let initialState: ProfilePageType = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCounter: 15},
        {id: 2, message: 'Fine, thanks', likesCounter: 25},
        {id: 3, message: 'WHOOP WHOOP!', likesCounter: 48},
    ],
    profile: {} as UserProfileType,
}

const profileReducer = (state: ProfilePageType = initialState, action: AllACTypes): ProfilePageType => {

    switch (action.type) {
        case 'ADD_POST': {
            let newPost: PostType = {
                id: 5,
                message: state.newPostText,
                likesCounter: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostText: ''};
        }
        case 'UPDATE_NEW_POST_TEXT': {
            return {...state, newPostText: action.newText}
        }
        case 'SET_USERS-PROFILE': {
            return {...state, profile: action.profile }
        }
        default:
            return state
    }
}

export default profileReducer;
export const addPostAC = () => {
    return {
        type: 'ADD_POST',
    } as const
}

export const onChangeHandlerAC = (text: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newText: text
    } as const
}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: 'SET_USERS-PROFILE',
        profile
    } as const
}