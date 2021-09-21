import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import {
    AllACTypes,
    DialogType,
    MessageType
} from "../redux/store";
import {v1} from 'uuid';
import {sendMessageBodyAC, updateNewMessageBodyAC} from "../redux/Reducers/dialogs-reducer";

export type DialogsPagePropsType = {
    dispatch: (action: AllACTypes) => void
    newMessageBody: string
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}

const Dialogs = (props: DialogsPagePropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem key={v1()} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <MessageItem key={v1()} message={m.message} id={m.id}/>)

    let newMessageBody = props.newMessageBody
    let onClickSendMessage = () => {
        props.dispatch(sendMessageBodyAC())
    }
    let onChangeNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.dispatch(updateNewMessageBodyAC(body))
    }

    return (
        <div className={classes.Dialogs}>
            <div className={classes.DialogsItems + '' + classes.active}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onChangeNewMessage}
                                   placeholder='insert your message'></textarea></div>
                    <div>
                        <button onClick={onClickSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default Dialogs;
