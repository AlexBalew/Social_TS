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

type PhotosType = {
    small: string
    large: string
}

export type UpdateUserPhotoType = {
    data: {
        photos: PhotosType
    }
    resultCode: number
    fieldsErrors: []
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
        case 'profile/ADD_POST': {
            let newPost: PostType = {
                id: 5,
                message: action.newPost,
                likesCounter: 0
            }
            return {...state, posts: [...state.posts, newPost]};
        }
        case 'profile/SET_USERS-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'profile/SET_USERS_STATUS': {
            return {...state, status: action.status}
        }
        case 'profile/UPDATE_PHOTO': {
          return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}

export default profileReducer;


export const addPostAC = (newPost: string) => {
    return {
        type: 'profile/ADD_POST',
        newPost
    } as const
}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: 'profile/SET_USERS-PROFILE',
        profile
    } as const
}

export const setUserStatus = (status: string) => {
    return {
        type: 'profile/SET_USERS_STATUS',
        status
    } as const
}

export const updatePhotoAC = (photos: PhotosType) => {
    return {
        type: 'profile/UPDATE_PHOTO',
        photos
    } as const
}


export const showUserTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await showUser(userId)
    dispatch(setUserProfile(response))
}

export const getUserStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response))
}

export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhotoTC = (selectedFile: string | Blob) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updatePhoto(selectedFile)
    if (response.resultCode === 0) {
        dispatch(updatePhotoAC(response.data.photos))
    }
}