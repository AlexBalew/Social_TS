import {AllACTypes} from "../redux-store";

export type UserType = {
    id: number
    photoURL: string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string,
        country: string
    }
}

export type UsersPageType = {
    users: Array<UserType>
}

let initialState: UsersPageType = {
    users: [
        {id: 1, photoURL: 'https://i.pinimg.com/originals/2c/cf/78/2ccf78dd2564d2067e0203823fa66c8c.jpg', followed: true, fullName: 'Alex', status: 'Howdy folks!', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEH-szSsbp1TB_yT-Vhi-7QCyjAnxhNqeu0Fb9tOPwtEKMgACnq0xoadGvbpgU9dUEAlc&usqp=CAU', followed: true, fullName: 'Bob', status: 'Open to new ideas', location: {city: 'Brussels', country: 'Belgium'}},
        {id: 3, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTai5liDn6mltiPfC7nIMC0a2UBVCSvzWwpdExj9YSGViP5EebCZjIwZpXFwos84J7OXzU&usqp=CAU', followed: true, fullName: 'Kate', status: 'Let me entertain you(c)', location: {city: 'Paris', country: 'France'}},
        {id: 4, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI6d3zqHd5b5vS_hii8v6ZD6OeD2nIMmHo3A&usqp=CAU', followed: false, fullName: 'Neal', status: 'What a great day!', location: {city: 'Pert', country: 'Australia'}},
    ]
}

const usersReducer = (state: UsersPageType = initialState, action: AllACTypes): UsersPageType => {

    switch (action.type) {
        case 'FOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}
        }
        case 'UNFOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}
        }
        case 'SET_USERS': {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state
    }
}

export default usersReducer;


export const followAC = (userID: number) => {
    return {
        type: 'FOLLOW',
        userID,
    } as const
}

export const unfollowAC = (userID: number) => {
    return {
        type: 'UNFOLLOW',
        userID,
    } as const
}

export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: 'SET_USERS',
        users,
    } as const
}