import profileReducer, {addPostAC, onChangeHandlerAC} from "../Reducers/profile-reducer";
import dialogsReducer, {sendMessageBodyAC, updateNewMessageBodyAC} from "../Reducers/dialogs-reducer";
import friendsBarReducer from "../Reducers/friendsBar-reducer";

type FriendType = {
    id: number
    name: string
}

export type FriendsType = Array<FriendType>

export type FriendsBarType = {
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
    newMessageBody: string
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
    friendsBar: FriendsBarType
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (_state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (callback: (props: RootStateType) => void) => void
    dispatch: (action: AllACTypes) => void
}

export type AllACTypes = ReturnType<typeof addPostAC> |
    ReturnType<typeof onChangeHandlerAC> |
    ReturnType<typeof updateNewMessageBodyAC> |
    ReturnType<typeof sendMessageBodyAC>

/*_____Store______*/

let store: StoreType = {
    _state: {
        profilePage: {
            newPostText: '',
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCounter: 15},
                {id: 2, message: 'Fine, thanks', likesCounter: 25},
                {id: 3, message: 'WHOOP WHOOP!', likesCounter: 48},
            ],
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Alex"},
                {id: 2, name: "Kate"},
                {id: 3, name: "Bob"},
                {id: 4, name: "Michael"},
                {id: 5, name: "Kostya"},
            ],
            messages: [
                {id: 1, message: "Hi there"},
                {id: 2, message: "Hello bud"},
                {id: 3, message: "Howdy"},
                {id: 4, message: "Greetings!"},
                {id: 5, message: "Did you sign up for Stalker 2?"},
            ],
            newMessageBody: ''
        },
        friendsBar: {
            friends: [
                {id: 1, name: "Alex"},
                {id: 2, name: "Kate"},
                {id: 3, name: "Bob"},
                {id: 4, name: "Alex"},
            ],
        },
    },
    _callSubscriber() {
        console.log('state was changed')
    },
    getState() {
        return this._state
    },
    subscribe(callback) {
        this._callSubscriber = callback
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.friendsBar = friendsBarReducer(this._state.friendsBar, action)

        this._callSubscriber(this._state)

    }

}

export default store;
//window.store = store
