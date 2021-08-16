

type FriendType = {
    id: number
    name: string
}

export type FriendsType = Array<FriendType>

export type SideBarType = {
    friends: FriendsType
}

export type MessageType = {
    id: number
    message: string
}

export type MessagesType = Array<MessageType>

export type DialogType = {
    id: number
    name: string
}

export type DialogsType = Array<DialogType>

export type DialogsPageType = {
    dialogs: DialogsType
    messages: MessagesType
}

export type PostType = {
    id: number
    message: string
    likesCounter: number
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sideBar: SideBarType
}

let state: RootStateType = {
    profilePage: {
        newPostText: '',
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCounter: 15},
            {id: 2, message: 'Fine, thanks', likesCounter: 25},
            {id: 3, message: 'WHOOP WHOOP!', likesCounter: 48}
        ],
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
    },
}

let rerenderEntireTree = () => {
    console.log('state was changed')
}

export const addPost = () => {
    let newPost: PostType = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCounter: 1
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree()
}

export const UpdateNewPostText = (newText: string) => {

    state.profilePage.newPostText = newText

    rerenderEntireTree()
}

export const subscribe = (observer: any) => {
    rerenderEntireTree = observer
}

export default state;
