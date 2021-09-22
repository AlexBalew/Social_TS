import React from 'react';
import {AllACTypes, mainReducerType} from "../redux/redux-store";
import {sendMessageBodyAC, updateNewMessageBodyAC} from "../redux/Reducers/dialogs-reducer";
import {Store} from "redux";
import Dialogs from './Dialogs';

export type DialogsPagePropsType = {
    store: Store<mainReducerType, AllACTypes>
}

const DialogsContainer = (props: DialogsPagePropsType) => {

    let state = props.store.getState()

    let onClickSendMessage = () => {
        props.store.dispatch(sendMessageBodyAC())
    }

    let onChangeNewMessage = (body: string) => {
        props.store.dispatch(updateNewMessageBodyAC(body))
    }

    return <Dialogs updateNewMessageBody={onChangeNewMessage}
                    sendMessageBody={onClickSendMessage}
                    dialogsPage={state.dialogsPage}
    />
}

export default DialogsContainer;
