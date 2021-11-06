import axios from "axios";
import {UpdateUserPhotoType, UpdateUserStatusType, UserProfileType} from "../redux/Reducers/profile-reducer";
import {AuthUserType, ResponseCaptchaType, ResponseType} from "../redux/Reducers/auth-reducer";

const baseAxiosSettings = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ae005362-3cd1-4901-a9c5-790f2698eec1'
    },
})

export const requestUsers = (currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) => {
    return baseAxiosSettings.get(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `${friend}`))
        .then(res => res.data)
}

export const unFollow = (id: number) => {
    return baseAxiosSettings.delete(`follow/${id}`)
        .then(res => res.data)
}

export const follow = (id: number) => {
    return baseAxiosSettings.post(`follow/${id}`, {})
        .then(res => res.data)
}

export const putStatus = (status: string) => {
    return baseAxiosSettings.put(`profile/status`, {status})
        .then(res => {
            console.log(res.data)})
}

export const showUser = (userId: number) => {
    return profileAPI.getProfile(userId)
}




export const profileAPI = {
    getProfile(userId: number) {
        return baseAxiosSettings.get<UserProfileType>(`profile/` + userId)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return baseAxiosSettings.get<string>(`profile/status/` + userId)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return baseAxiosSettings.put<UpdateUserStatusType>(`profile/status/`, {status})
            .then(res => res.data)
    },
    updatePhoto(selectedFile: string | Blob) {
        const formData = new FormData()
        formData.append('image', selectedFile)
        return baseAxiosSettings.put<UpdateUserPhotoType>(`profile/photo/`, formData, {
            headers: {
                'Content-type':'multipart/form-data'
            }
        })
            .then(res => res.data)
    }
}

export const authAPI = {
    login (email: string, password: string, rememberMe = false) {
        return baseAxiosSettings.post<ResponseType<{userId: string}>>(`auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    authMe () {
        return baseAxiosSettings.get<ResponseType<AuthUserType>>(`auth/me`)
            .then(res => res.data)
    },
    logOut() {
        return baseAxiosSettings.delete<ResponseType>(`auth/login`)
    }
}

export const secureAPI = {
    getCaptcha () {
        return baseAxiosSettings.get<ResponseCaptchaType>(`security/get-captcha-url`)
    }
}