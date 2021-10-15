import axios from "axios";
import {UserProfileType} from "../redux/Reducers/profile-reducer";

const baseAxiosSettings = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY' : 'ae005362-3cd1-4901-a9c5-790f2698eec1'
    },
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return baseAxiosSettings.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data)
}

export const authMe = () => {
    return baseAxiosSettings.get(`auth/me`)
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

export const showUser = (userId: number) => {
    return baseAxiosSettings.get<UserProfileType>(`profile/` + userId)
        .then(res => res.data)
}
