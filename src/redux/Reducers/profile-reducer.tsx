import {AllACType} from "../redux-store";
import {Nullable} from '../../types';
import {profileAPI, showUser} from "../../API/api";
import {Dispatch} from "redux";


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

export type UpdateUserStatusType = {
    resultCode: number
    messages: string[]
    data: string
}

export type UpdateUserPhotoType = {
    data: {
        small: string
        large: string
    }
    resultCode: number
    messages: string[]
}

export type ProfilePageType = {
    posts: Array<PostType>
    profile: UserProfileType
    status: string
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCounter: 15},
        {id: 2, message: 'Fine, thanks', likesCounter: 25},
        {id: 3, message: 'WHOOP WHOOP!', likesCounter: 48},
    ],
    profile: {} as UserProfileType,
    status: '',
}

const profileReducer = (state: ProfilePageType = initialState, action: AllACType): ProfilePageType => {

    switch (action.type) {
        case 'ADD_POST': {
            let newPost: PostType = {
                id: 5,
                message: action.newPost,
                likesCounter: 0
            }
            return {...state, posts: [...state.posts, newPost]};
        }
        case 'SET_USERS-PROFILE': {
            return {...state, profile: action.profile }
        }
        case 'SET_USERS_STATUS': {
            return {...state, status: action.status }
        }
        default:
            return state
    }
}

export default profileReducer;


export const addPostAC = (newPost: string) => {
    return {
        type: 'ADD_POST',
        newPost
    } as const
}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: 'SET_USERS-PROFILE',
        profile
    } as const
}

export const setUserStatus = (status: string) => {
    return {
        type: 'SET_USERS_STATUS',
        status
    } as const
}


export const showUserTC = (userId: number) => (dispatch: Dispatch) => {
    showUser(userId)
        .then(data => {
            dispatch(setUserProfile(data))
        });
}

export const getUserStatusTC = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setUserStatus(data))
        });
}

export const updateUserStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if(data.resultCode === 0) {
            dispatch(setUserStatus(status))
            }
        });
}