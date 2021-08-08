type FriendType = {
    id: number
    name: string
}

type FriendsType = Array<FriendType>

export type SideBarType = {
    friends: FriendsType
}

export type MessageType = {
    id: number
    message: string
}

type MessagesType = Array<MessageType>

export type DialogType = {
    id: number
    name: string
}

type DialogsType = Array<DialogType>

export type DialogsPageType = {
    dialogs: DialogsType
    messages: MessagesType
}

export type PostType = {
    id: number
    message: string
    likesCounter: number
}

export type PostsType = Array<PostType>

export type ProfilePageType = {
    posts: PostsType
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sideBar: SideBarType
}

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCounter: 15},
            {id: 2, message: 'Fine, thanks', likesCounter: 25},
            {id: 3, message: 'WHOOP WHOOP!', likesCounter: 48}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: "Alex"},
            {id: 2, name: "Kate"},
            {id: 3, name: "Bob"},
            {id: 4, name: "Michael"},
            {id: 5, name: "Kostya"}
        ],
        messages: [
            {id: 1, message: "Hi there"},
            {id: 2, message: "Hello bud"},
            {id: 3, message: "Howdy"},
            {id: 4, message: "Greetings!"},
            {id: 5, message: "Did you sign for Stalker 2?"}
        ]
    },
    sideBar: {
        friends: [
            {id: 1, name: "Alex"},
            {id: 2, name: "Kate"},
            {id: 3, name: "Bob"},
            {id: 4, name: "Alex"}
        ]
    }
}



export default state;
