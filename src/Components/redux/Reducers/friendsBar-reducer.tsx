import {AllACTypes} from "../redux-store";

type FriendType = {
    id: number
    name: string
}

export type FriendsType = Array<FriendType>

export type FriendsBarType = {
    friends: FriendsType
}

let initialState: FriendsBarType = {
    friends: [
        {id: 1, name: "Alex"},
        {id: 2, name: "Kate"},
        {id: 3, name: "Bob"},
        {id: 4, name: "Alex"},
    ],
}

const friendsBarReducer = (state: FriendsBarType = initialState, action: AllACTypes): FriendsBarType => {

    return state
}

export default friendsBarReducer;