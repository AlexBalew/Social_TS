import {AllACType} from "../redux-store";

export type FriendType = {
    id: number
    name: string
    avatar: string
}

export type FriendsType = Array<FriendType>

export type FriendsBarType = {
    friends: FriendsType
}

let initialState: FriendsBarType = {
    friends: [
        {id: 1, name: "Alex", avatar: 'https://i.pinimg.com/originals/2c/cf/78/2ccf78dd2564d2067e0203823fa66c8c.jpg'},
        {id: 2, name: "Kate", avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTai5liDn6mltiPfC7nIMC0a2UBVCSvzWwpdExj9YSGViP5EebCZjIwZpXFwos84J7OXzU&usqp=CAU'},
        {id: 3, name: "Bob", avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEH-szSsbp1TB_yT-Vhi-7QCyjAnxhNqeu0Fb9tOPwtEKMgACnq0xoadGvbpgU9dUEAlc&usqp=CAU'},
        {id: 4, name: "Hank", avatar: 'https://www.pngkey.com/png/detail/180-1800743_hank-hill.png'},
    ],
}

const friendsBarReducer = (state: FriendsBarType = initialState, action: AllACType): FriendsBarType => {

    return state
}

export default friendsBarReducer;

