import {AllACType} from "../redux-store";

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
}

const dialogsReducer = (state: DialogsPageType = initialState, action: AllACType): DialogsPageType => {

    switch (action.type) {
        case 'SEND_MESSAGE': {
            let body = action.newDialogMessage
            return {...state, messages: [...state.messages, {id: 6, message: body}]}
        }
        default:
            return state
    }
}

export default dialogsReducer;

export const sendNewDialogMessageAC = (newDialogMessage: string) => {
    return {
        type: 'SEND_MESSAGE',
        newDialogMessage
    } as const
}