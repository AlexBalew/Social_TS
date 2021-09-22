import {AllACTypes} from "../redux-store";

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

let initialState: DialogsPageType = {
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
}

const dialogsReducer = (state: DialogsPageType = initialState, action: AllACTypes): DialogsPageType => {

    switch (action.type) {
        case 'UPDATE_NEW_MESSAGE_BODY':
            state.newMessageBody = action.body
            return state
        case 'SEND_MESSAGE':
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
        default:
            return state
    }
}

export default dialogsReducer;
export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: 'UPDATE_NEW_MESSAGE_BODY',
        body
    } as const
}
export const sendMessageBodyAC = () => {
    return {
        type: 'SEND_MESSAGE',
    } as const
}